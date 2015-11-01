def hello():
	x = request.env.http_accept_language
	return "<html><body><h1>%s</h1></body></html>" % x
