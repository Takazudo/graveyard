# -*- coding: utf-8 -*-
from google.appengine.dist import use_library
use_library('django', '1.2')

import os
from google.appengine.ext import webapp
from google.appengine.ext.webapp import RequestHandler, WSGIApplication, template
from google.appengine.ext.webapp.util import run_wsgi_app

def apply_template(tmplfile, tmplvals={}):
	path = os.path.join(os.path.dirname(__file__), tmplfile)
	return template.render(path, tmplvals)

class MainHandler(RequestHandler):

	def get(self):
		self.response.out.write(apply_template('index.html'))

def main():

	application = WSGIApplication([
		('/hoge', MainHandler),
		('/foo', MainHandler),
		('/bar', MainHandler),
		('/', MainHandler)
	], debug=True)

	run_wsgi_app(application)

if __name__ == '__main__':
	main()
