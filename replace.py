import re

replacement = None

with open("dict.html", "r") as f:
    replacement = f.read()

new_file = None

with open("index.html", "r") as f:
    new_file = re.sub(r"\/\/\<sed replace.*\n.*sed replace\>", replacement, f.read(), flags=re.M | re.S)
    #print(o)

with open("index.html", "w") as f:
    f.write(new_file)