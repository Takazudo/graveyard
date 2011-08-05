# -*- coding: utf-8 -*-

from google.appengine.ext import webapp
from google.appengine.ext.webapp import util
from google.appengine.api import urlfetch
import urllib, logging

class LikeCount(webapp.RequestHandler):

	def get(self):

		fields = {
			'format': 'JSON',
			'query': 'SELECT like_count FROM link_stat WHERE url="%s"' % self.request.get('url')
		}
		data = urllib.urlencode(fields)
		logging.error(data)
		url = 'https://api.facebook.com/method/fql.query?' + data
		res = urlfetch.fetch(
				url = url,
				method = urlfetch.GET
			)
		self.response.headers['Content-Type'] = "application/json; charset=UTF-8"
		self.response.out.write(res.content)

class MainHandler(webapp.RequestHandler):

	def get(self):
	    self.response.out.write('Hello world!')

def main():

	application = webapp.WSGIApplication([
		('/service/likecount', LikeCount),
		('/', MainHandler)
	], debug=True)

	util.run_wsgi_app(application)


if __name__ == '__main__':
	main()
