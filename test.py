import pandas as pd

def add():

    df = pd.DataFrame()
    df["roll"] = [i for i in range(10)]
    df["name"] = ["abc" for i in range(10)]

    data = []

    for i in df.iterrows():
       print(i)


    dict = {
        "roll": list(df["roll"]),
        "name": list(df["name"])
    }

    return data

add()