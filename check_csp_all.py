import urllib.request

urls = [
    'https://yaazh360digitech.in/',
    'https://yaazh360digitech.in/services',
    'https://yaazh360digitech.in/about',
    'https://yaazh360digitech.in/work',
    'https://yaazh360digitech.in/contact',
    'https://yaazh360digitech.in/careers',
    'https://yaazh360digitech.in/digital-marketing-company-coimbatore',
    'https://yaazh360digitech.in/website-development-coimbatore',
    'https://yaazh360digitech.in/software-development-coimbatore',
    'https://yaazh360digitech.in/404',
    'https://yaazh360digitech.in/robots.txt',
    'https://yaazh360digitech.in/sitemap.xml',
]

for u in urls:
    try:
        req = urllib.request.Request(u, headers={'User-Agent': 'Screaming Frog SEO Spider/20.0'})
        with urllib.request.urlopen(req) as resp:
            csp = resp.headers.get('Content-Security-Policy')
            print(f"{u}: status={resp.status}, CSP={'YES' if csp else 'MISSING'}")
    except urllib.error.HTTPError as e:
        csp = e.headers.get('Content-Security-Policy')
        print(f"{u}: status={e.code}, CSP={'YES' if csp else 'MISSING'}")
