#!/usr/bin/python
import cgitb,os,cgi
cgitb.enable()
form=cgi.FieldStorage()
models=[cur[:-len('.gchempaint')] for cur in os.listdir('../') if cur.endswith('.gchempaint')]
models.sort()
r='<select name="model">'
for model in models:
        r+='<option '
	r+='value="%s">%s</option>'%(model,model)
r+='</select>'
print 'Content-type: text/html\n'
print open('index.html','r').read().replace('<!-- select -->',r)
