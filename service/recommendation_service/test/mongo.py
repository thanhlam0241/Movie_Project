# MONGO_DETAILS = "mongodb://127.0.0.1:27017"

# client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

# # Send a ping to confirm a successful connection
# async def get():
#     try:
#         client.admin.command('ping')
#         print("Pinged your deployment. You have successfully connected to MongoDB!")
#         database = await client.get_database('movie_warehouse')

#         # user_mapping_collection = database.get_collection("user_mapping")

#         movie_mapping_collection = await database.get_collection("movie_mapping")

#         movie_mapping = await  movie_mapping_collection.find()

#         print("Mapping", movie_mapping)
#     except Exception as e:
#         print(e)
