# -*- coding: utf-8 -*-
# this file is released under public domain and you can use without limitations

#########################################################################
## This is a sample controller
## - index is the default action of any application
## - user is required for authentication and authorization
## - download is for downloading files uploaded in the db (does streaming)
#########################################################################

def index():
    return locals()
    
    
    def index():
	rows = db(db.blog_post).select()
	for row in rows:
		row.hasMoreToRead = False
		if len(str(row.body)) > 1500:
			row.body = str(row.body)[:2000] + ' .... '
			row.hasMoreToRead = True
	return locals()
	
	
def getAccountCollection():
	json = []
	rows = db(db.accounts).select()
	for row in rows:
		json.append({'name': row.name, 'id': row.id})
		
	return response.json(json)
