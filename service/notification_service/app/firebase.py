import firebase_admin
from firebase_admin import credentials, messaging

cred = credentials.Certificate("firebase.json")
firebase_admin.initialize_app(cred)

def sendMessageToTopic(message, topic):
    # See documentation on defining a message payload.
    message = messaging.Message(
        data=message,
        topic=topic,
    )

    # Send a message to the devices subscribed to the provided topic.
    response = messaging.send(message)
    # Response is a message ID string.
    print(f'Successfully sent message {message} to the topic {topic}: ', response)
    # [END send_to_topic]