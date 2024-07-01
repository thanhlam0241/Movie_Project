from consumer_user_behavior import consumeUserBehavior

if __name__ == "__main__":
    try:
        consumeUserBehavior()
    except Exception as ex:
        print(ex)