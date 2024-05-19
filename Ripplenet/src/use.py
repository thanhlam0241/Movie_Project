from predict import predict

def getRecommendOfUser(args, data_info):
    a, b = predict(args, data_info)
    
    return a, b
