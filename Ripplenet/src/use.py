from predict import predict

def getRecommendOfUser(args, data_info, userId = None):
    a, b = predict(args, data_info, userId)
    
    return b
