import os
import re

def count_syllables(word):
    word = word.lower()
    if len(word) <= 3: return 1
    word = re.sub(r'(?:[^laeiouy]|ed|es|e)$', '', word)
    word = re.sub(r'^y', '', word)
    sylls = len(re.findall(r'[aeiouy]{1,2}', word))
    return max(1, sylls)

html_files = [f for f in sorted(os.listdir('dist')) if f.endswith('.html') and f != '404.html']

for f in html_files:
    with open(os.path.join('dist', f), 'r', encoding='utf-8') as fl:
        text = fl.read()
    text = re.sub(r'<script[\s\S]*?</script>', ' ', text, flags=re.I)
    text = re.sub(r'<style[\s\S]*?</style>', ' ', text, flags=re.I)
    text = re.sub(r'<[^>]+>', ' ', text)
    sentences = [s.strip() for s in re.split(r'[.!?]+', text) if len(s.strip()) > 3]
    words = [w for w in re.findall(r'\b[A-Za-z]+\b', text)]
    if not sentences or not words: continue
    
    # Find long sentences (> 18 words)
    long_sents = [s for s in sentences if len(re.findall(r'\b[A-Za-z]+\b', s)) > 16]
    # Find 4+ syllable words
    heavy_words = [w for w in set(words) if count_syllables(w) >= 4]
    
    asl = len(words) / len(sentences)
    asw = sum(count_syllables(w) for w in words) / len(words)
    fre = 206.835 - (1.015 * asl) - (84.6 * asw)
    
    print(f"\n{'='*20} {f} (FRE={fre:.1f}, ASL={asl:.1f}, ASW={asw:.2f}) {'='*20}")
    print(f"Long sentences count: {len(long_sents)}")
    if long_sents:
        for s in long_sents[:3]:
            print(f"  - ({len(re.findall(r'[A-Za-z]+', s))} words): {s[:100]}...")
    print(f"Heavy words (sample): {list(heavy_words)[:6]}")
