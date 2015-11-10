
def index():
    return locals()	
	
def getAccountCollection():
	json = []
	rows = db().select(db.accounts.ALL, orderby=db.accounts.name)
	for row in rows:
		json.append({'name': row.name, 'id': row.id})
		
	return response.json(json)
	
def getInviteeCollection():
	json = []
	rows = db(db.invitees.account_id.contains(request.args)).select(orderby=db.invitees.first_name)
	for row in rows:
		json.append({'id': row.id, 'first_name': row.first_name, 'last_name': row.last_name, 'email': row.email})
		
	return response.json(json)
