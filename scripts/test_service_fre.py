import re

def calc_fre(text):
    def count_syllables(word):
        word = word.lower()
        if len(word) <= 3: return 1
        word = re.sub(r'(?:[^laeiouy]|ed|es|e)$', '', word)
        word = re.sub(r'^y', '', word)
        sylls = len(re.findall(r'[aeiouy]{1,2}', word))
        return max(1, sylls)
    sentences = [s.strip() for s in re.split(r'[.!?]+', text) if len(s.strip()) > 3]
    words = [w for w in re.findall(r'\b[A-Za-z]+\b', text)]
    if not sentences or not words: return 0
    asl = len(words) / len(sentences)
    asw = sum(count_syllables(w) for w in words) / len(words)
    fre = 206.835 - (1.015 * asl) - (84.6 * asw)
    return fre, asl, asw

# Test digital marketing text simplification
dm_old = """
Yaazh 360 Digitech helps businesses in Coimbatore connect with customers through search, paid advertising and social media. We bring campaign planning, creative content and website improvements together around your business goals.
Help customers find your services through technical SEO, useful service content, clear page titles and internal links. We focus on relevant searches and track organic visibility over time.
Reach people searching for your services with targeted campaigns and relevant landing pages. Agree the budget, audience and conversion goals before launching. Advertising spend is separate from organic search ranking.
Build a consistent presence with content planning, branded designs and social media management. Choose channels based on your customers and the content your business can provide.
Keep your services, contact information and opening hours accurate so local customers can understand your business and contact you. Local visibility also depends on the searcher’s location and competition.
"""

dm_new = """
Yaazh 360 Digitech helps Coimbatore shops and firms find new clients. We run search ads, social posts, and local SEO. Our team plans each step to match your sales targets.
Help local buyers find your website on Google. We fix page speed, write clear titles, and link your key pages. We track your search rank each week.
Reach buyers who need your help today. We build fast ad pages that turn clicks into calls. You set your monthly budget before we start.
Share helpful posts on Instagram and Facebook. We design branded cards and write catchy captions. We pick social apps that your buyers use most.
Keep your address, phone number, and open hours up to date on Google Maps. Fast, clear info helps nearby clients call or visit your shop.
"""

print("DM Old:", calc_fre(dm_old))
print("DM New:", calc_fre(dm_new))
