import urllib.request,re,json,concurrent.futures,datetime
from pathlib import Path
base='https://github.com/users/alidaexpert/contributions'
def fetch(u):return urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'Ali-Portfolio'}),timeout=30).read().decode()
repos=json.loads(fetch('https://api.github.com/users/alidaexpert/repos?sort=updated&per_page=6'))
repos=[{'name':r['name'],'url':r['html_url'],'description':r['description'] or '', 'stars':r['stargazers_count'],'forks':r['forks_count'],'language':r['language']} for r in repos]
def one(year):
 html=fetch(base if year=='recent' else base+'?from='+year+'-01-01&to='+year+'-12-31');counts={}
 for a,b in re.findall(r'<tool-tip\b([^>]*)>([\s\S]*?)</tool-tip>',html):
  ident=re.search(r'\bfor="([^"]+)"',a);n=re.match(r'([\d,]+) contributions?',b.strip())
  if ident and (n or b.strip().startswith('No contributions')):counts[ident[1]]=int(n[1].replace(',','')) if n else 0
 days=[]
 for attrs in re.findall(r'<td\b([^>]*)>',html):
  date=re.search(r'data-date="([\d-]+)"',attrs);ident=re.search(r'\bid="([^"]+)"',attrs)
  if date and ident:days.append({'date':date[1],'contributionCount':counts[ident[1]]})
 assert len(days)>200
 days.sort(key=lambda d:d['date']);weeks=[]
 for d in days:
  if not weeks or datetime.date.fromisoformat(d['date']).weekday()==6:weeks.append({'contributionDays':[]})
  weeks[-1]['contributionDays'].append(d)
 return year,{'configured':True,'url':'https://github.com/alidaexpert','weeks':weeks,'totalContributions':sum(d['contributionCount'] for d in days),'repos':repos,'fetchedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'year':year,'source':'GitHub public contribution calendar'}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as ex:out=dict(ex.map(one,['recent','2026','2025','2024','2023','2022','2021']))
Path('app/github-snapshot.json').write_text(json.dumps(out))
print({y:d['totalContributions'] for y,d in out.items()})
