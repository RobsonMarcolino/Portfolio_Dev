import os
import glob

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replacements for light theme
    replacements = [
        ("text-white", "text-navy"),
        ("text-cyan", "text-orange"),
        ("bg-cyan", "bg-orange"),
        ("border-cyan", "border-orange"),
        ("bg-navy", "bg-off-white"),
        ("bg-navy-light", "bg-white"),
        ("from-navy", "from-off-white"),
        ("to-navy-mid", "to-white"),
        ("to-navy", "to-off-white"),
        ("rgba(6,214,160", "rgba(241,90,36"),
        ("text-slate", "text-slate-600"),
        ("text-off-white", "text-navy"),
        ("rgba(10,15,28", "rgba(244,244,246"), # Hero vignette
        ("var(--color-cyan)", "var(--color-orange)"),
        ("var(--color-navy)", "var(--color-off-white)")
    ]

    new_content = content
    for old, new in replacements:
        new_content = new_content.replace(old, new)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

# Find all tsx files in components
component_files = glob.glob('c:/Users/robso/OneDrive/Área de Trabalho/Portf/portfolio-next/src/components/**/*.tsx', recursive=True)

for file in component_files:
    replace_in_file(file)

print("Done updating colors.")
