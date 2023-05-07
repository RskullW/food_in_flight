from aiogram import Bot, Dispatcher, executor, types
from dotenv import load_dotenv, find_dotenv
import os
import asyncio


load_dotenv(find_dotenv())
API_TOKEN = os.getenv('BOT_TOKEN')

bot = Bot(token=API_TOKEN)
dp = Dispatcher(bot)

@dp.message_handler(commands=['start', 'help'])
async def send_welcome(message: types.Message):
    await bot.send_message(message.from_user.id, "Привет! \n В этом диалоге ты будешь получать оповещения о всех своих заказах")

async def run_notify():
    while True:
        await bot.send_message(1280767960, "5 seconds")
        await asyncio.sleep(5)


if __name__ == '__main__':
    loop = asyncio.new_event_loop()
    loop.create_task(run_notify())
    executor.start_polling(dp, skip_updates=True)
