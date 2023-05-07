from aiogram import Bot, Dispatcher, executor, types
from dotenv import load_dotenv, find_dotenv
import os

load_dotenv(find_dotenv())
API_TOKEN = os.getenv('BOT_TOKEN')

bot = Bot(token=API_TOKEN)
dp = Dispatcher(bot)

@dp.message_handler(commands=['start', 'help'])
async def send_welcome(message: types.Message):
    await bot.send_message(message.from_user.id, message.from_user.id)


if __name__ == '__main__':
    executor.start_polling(dp, skip_updates=True)
