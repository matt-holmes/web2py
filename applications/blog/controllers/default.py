# -*- coding: utf-8 -*-
# this file is released under public domain and you can use without limitations

#########################################################################
## This is a sample controller
## - index is the default action of any application
## - user is required for authentication and authorization
## - download is for downloading files uploaded in the db (does streaming)
#########################################################################

def index():
	rows = db(db.blog_post).select()
	for row in rows:
		row.hasMoreToRead = False
		if len(str(row.body)) > 1500:
			row.body = str(row.body)[:2000] + ' .... '
			row.hasMoreToRead = True
	return locals()

@auth.requires_membership('managers')
def create():
	db.blog_post.time_stamp.default = request.now
	db.blog_post.time_stamp.writable = False
	db.blog_post.time_stamp.readable = False
	form = SQLFORM(db.blog_post).process()
	if form.accepted: redirect(URL('index'))
	return locals()

def show_post():
	post = db.blog_post(request.args(0,))
	return locals()

@auth.requires_membership('managers')
def manage():
	grid = SQLFORM.grid(db.blog_post)
	return locals()

def user():
    """
    exposes:
    http://..../[app]/default/user/login
    http://..../[app]/default/user/logout
    http://..../[app]/default/user/register
    http://..../[app]/default/user/profile
    http://..../[app]/default/user/retrieve_password
    http://..../[app]/default/user/change_password
    http://..../[app]/default/user/manage_users (requires membership in
    use @auth.requires_login()
        @auth.requires_membership('group name')
        @auth.requires_permission('read','table name',record_id)
    to decorate functions that need access control
    """
    return dict(form=auth())


@cache.action()
def download():
    """
    allows downloading of uploaded files
    http://..../[app]/default/download/[filename]
    """
    return response.download(request, db)


def call():
    """
    exposes services. for example:
    http://..../[app]/default/call/jsonrpc
    decorate with @services.jsonrpc the functions to expose
    supports xml, json, xmlrpc, jsonrpc, amfrpc, rss, csv
    """
    return service()


