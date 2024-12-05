def handle_request():
    files_ids = list(flask.request.files)
    image_num = 1
    file_name = ""
    for file_id in files_ids:
        imagefile = flask.request.files[file_id]
        filename = werkzeug.utils.secure_filename(imagefile.filename)
        print("Image Filename : " + imagefile.filename)
        imagefile.save(filename)
        file_name = filename
        image_num = image_num + 1
    from detect import helper
    note = helper(file_name)
    note += ".jpg"
    print("Detected note: ", note)
    currency = ""
    if(re.findall(".*[2][0][0][0].*", note)):
        currency = "2000"
    elif(re.findall(".*[2][0][0][^0].*", note)):
        currency = "200"
    elif(re.findall(".*[2][0][^0].*", note)):
        currency = "20"
    elif(re.findall(".*[1][0][0][^0].*", note)):
        currency = "100"
    elif(re.findall(".*[1][0][^0].*", note)):
        currency = "10"
    elif(re.findall(".*[5][0][0].*", note)):
        currency = "500"
    elif(re.findall(".*[5][0][^0].*", note)):
        currency = "50"
    else:
        currency = "-1"
    

