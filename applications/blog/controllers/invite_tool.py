import uuid
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
		json.append({'id': row.uuid, 'first_name': row.first_name, 'last_name': row.last_name, 'email': row.email})
		
	return response.json(json)
	
def postInvitee():
    form = SQLFORM(db.invitees)
    id = str(uuid.uuid1())
    json = []
    request.post_vars.uuid = id
    if form.accepts(request, formname=None):
        json.append({'id': id})
        return response.json(json)
    elif form.errors:
        return False
        
def deleteInvitee():
    db(db.invitees.uuid == request.post_vars.id).delete()
    return True
