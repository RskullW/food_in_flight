from aiogram import Bot, Dispatcher, executor, types
from dotenv import load_dotenv, find_dotenv
import psycopg2
import os
import asyncio

load_dotenv(find_dotenv())
API_TOKEN = os.getenv('BOT_TOKEN')

bot = Bot(token=API_TOKEN)
dp = Dispatcher(bot)

host = os.getenv('POSTGRES_HOST_DOCKER') if os.getenv('INSIDE_A_DOCKER', False) else os.getenv('POSTGRES_HOST')

conn = psycopg2.connect(
    host=host,
    port=os.getenv('POSTGRES_PORT'),
    database=os.getenv('POSTGRES_NAME'),
    user=os.getenv('POSTGRES_USER'),
    password=os.getenv('POSTGRES_PASSWORD')
)


async def run_notify():
    while True:
        cur = conn.cursor()

        # Get all orders which need to be notified about
        cur.execute('SELECT id, state, delivery_price, email FROM main_order WHERE tg_notified=false;')
        orders = cur.fetchall()
        for order in orders:
            # If the state is PAID then notify user about the new order and its content
            # Otherwise notify user that the state changed
            query = cur.execute(f"SELECT id FROM auth_user WHERE email='{order[3]}';")
            try:
                user_id = cur.fetchone()[0]
            except Exception as e:
                print(e)
            cur.execute(f"SELECT tg_id FROM authentication_telegramid WHERE user_id='{user_id}';")

            if cur.rowcount == 0:
                pass
            else:
                user_tg_id = int(cur.fetchone()[0])

                if order[1] == 'PAID':

                    result_price = order[2]
                    result_items = []

                    # Get all items in each order
                    cur.execute(f"SELECT amount, item_id FROM main_orderproduct WHERE order_id={order[0]};")
                    items_in_order = cur.fetchall()

                    # Get the actual items to find out the prices and names
                    for item_in_order in items_in_order:
                        cur.execute(f"SELECT title, price FROM main_product WHERE id={item_in_order[1]};")
                        item_data = cur.fetchone()

                        # Add item name and quantity into the resulting items array
                        result_items.append((item_data[0], item_in_order[0]))
                        # Calculate the resulting price
                        result_price += item_data[1] * item_in_order[0]

                    # Construct the message
                    message_text = f"Номер заказа: {order[0]}\n"
                    message_text += "Товары: "

                    for i in range(len(result_items)):
                        if i != len(result_items) - 1:
                            message_text += f"{result_items[i][0]} (x{result_items[i][1]}), "
                        else:
                            message_text += f"{result_items[i][0]} (x{result_items[i][1]})\n"
                    message_text += f"Стоимость: {result_price} ₽\n"
                    message_text += "Статус заказа: Оплачен"

                    # Set the notified property to true
                    cur.execute(f"UPDATE main_order SET tg_notified=true WHERE id={order[0]};")
                    conn.commit()

                    await bot.send_message(user_tg_id, message_text)
                    print(f"User {user_tg_id} was notified [PAID]")

                elif order[1] == 'COOKING':

                    cur.execute(f"UPDATE main_order SET tg_notified=true WHERE id={order[0]};")
                    conn.commit()
                    await bot.send_message(user_tg_id,
                                           f"Статус заказа № {order[0]} изменился с \"Оплачено\" на \"Готовится\"")
                    print(f"User {user_tg_id} was notified [COOKING]")

                elif order[1] == 'DELIVERING':

                    cur.execute(f"UPDATE main_order SET tg_notified=true WHERE id={order[0]};")
                    conn.commit()
                    await bot.send_message(user_tg_id,
                                           f"Статус заказа № {order[0]} изменился с \"Готовится\" на \"В доставке\"")
                    print(f"User {user_tg_id} was notified [DELIVERING]")

                elif order[1] == 'DELIVERED':

                    cur.execute(f"UPDATE main_order SET tg_notified=true WHERE id={order[0]};")
                    conn.commit()
                    await bot.send_message(user_tg_id,
                                           f"Статус заказа № {order[0]} изменился с \"В доставке\" на \"Доставлен\"")
                    print(f"User {user_tg_id} was notified [DELIVERED]")

                elif order[1] == 'CANCELED':

                    cur.execute(f"UPDATE main_order SET tg_notified=true WHERE id={order[0]};")
                    conn.commit()
                    await bot.send_message(user_tg_id, f"Заказ № {order[0]} был отменён")
                    print(f"User {user_tg_id} was notified [CANCELED]")

        cur.close()
        await asyncio.sleep(5)


if __name__ == '__main__':
    loop = asyncio.new_event_loop()
    loop.create_task(run_notify())
    loop.run_forever()

    if conn is not None:
        conn.close()
