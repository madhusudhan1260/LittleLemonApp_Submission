import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ASSETS_DIR = os.path.abspath("assets")
MENU_DIR = os.path.join(ASSETS_DIR, "menu")
WIREFRAMES_DIR = os.path.abspath("wireframes")

os.makedirs(MENU_DIR, exist_ok=True)
os.makedirs(WIREFRAMES_DIR, exist_ok=True)

# Font helper
def get_font(name, size):
    fonts = {
        "serif_bold": "/System/Library/Fonts/Supplemental/Georgia Bold.ttf",
        "serif": "/System/Library/Fonts/Supplemental/Georgia.ttf",
        "sans_bold": "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "sans": "/System/Library/Fonts/Supplemental/Arial.ttf"
    }
    path = fonts.get(name, fonts["sans"])
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()

# 1. Generate Logo
def generate_logo():
    width, height = 800, 200
    img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Lemon icon on the left
    # Lemon body: yellow oval tilted slightly
    lemon_cx, lemon_cy = 100, 100
    
    # Outer lemon body (rich yellow #F4CE14)
    draw.ellipse([lemon_cx - 65, lemon_cy - 50, lemon_cx + 65, lemon_cy + 50], fill=(244, 206, 20, 255), outline=(225, 185, 10, 255), width=3)
    # Lemon tips
    draw.polygon([(lemon_cx - 75, lemon_cy), (lemon_cx - 55, lemon_cy - 15), (lemon_cx - 55, lemon_cy + 15)], fill=(244, 206, 20, 255))
    draw.polygon([(lemon_cx + 75, lemon_cy), (lemon_cx + 55, lemon_cy - 15), (lemon_cx + 55, lemon_cy + 15)], fill=(244, 206, 20, 255))
    
    # Green leaf at top right (#495E57)
    draw.ellipse([lemon_cx + 10, lemon_cy - 75, lemon_cx + 70, lemon_cy - 35], fill=(73, 94, 87, 255))
    draw.line([lemon_cx + 15, lemon_cy - 55, lemon_cx + 65, lemon_cy - 55], fill=(244, 206, 20, 255), width=2)

    # Little Lemon Text
    font_large = get_font("serif_bold", 68)
    font_sub = get_font("sans_bold", 22)

    # Dark Green Brand Text (#495E57)
    draw.text((200, 48), "LITTLE LEMON", font=font_large, fill=(73, 94, 87, 255))
    draw.text((205, 130), "MEDITERRANEAN RESTAURANT", font=font_sub, fill=(102, 117, 111, 255))

    logo_path = os.path.join(ASSETS_DIR, "logo.png")
    img.save(logo_path, "PNG")
    print(f"Saved logo: {logo_path}")

# 2. Generate Hero Food Image
def generate_hero_food():
    width, height = 600, 400
    img = Image.new("RGB", (width, height), (245, 235, 220))
    draw = ImageDraw.Draw(img)

    # Draw a rich wooden plate / rustic table background
    for y in range(height):
        ratio = y / height
        r = int(50 + 20 * ratio)
        g = int(35 + 15 * ratio)
        b = int(25 + 10 * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))

    # Ceramic plate
    plate_bbox = [80, 40, 520, 360]
    draw.ellipse(plate_bbox, fill=(238, 239, 235), outline=(210, 212, 208), width=8)
    # Inner rim
    draw.ellipse([110, 70, 490, 330], fill=(245, 246, 243))

    # Mediterranean Bruschetta / Grilled Gourmet items on plate
    # Artisanal sourdough slices
    draw.polygon([(160, 160), (280, 120), (310, 210), (190, 250)], fill=(195, 135, 75))
    draw.polygon([(170, 170), (270, 135), (295, 200), (195, 235)], fill=(225, 175, 115))

    draw.polygon([(260, 170), (410, 130), (430, 230), (280, 270)], fill=(185, 125, 65))
    draw.polygon([(270, 180), (395, 145), (415, 220), (290, 255)], fill=(220, 170, 110))

    # Bright Diced Tomatoes (Ruby Red)
    tomatoes = [
        (200, 180), (220, 165), (240, 190), (215, 205),
        (300, 185), (325, 170), (350, 195), (330, 215),
        (370, 180), (290, 210), (250, 175), (340, 160)
    ]
    for tx, ty in tomatoes:
        draw.ellipse([tx - 12, ty - 12, tx + 12, ty + 12], fill=(215, 45, 30), outline=(160, 25, 15), width=2)
        # Highlight
        draw.ellipse([tx - 6, ty - 6, tx - 1, ty - 1], fill=(255, 120, 100))

    # Basil Leaves (Deep Green)
    basil = [(210, 160), (250, 200), (310, 160), (350, 220), (280, 180), (380, 190)]
    for bx, by in basil:
        draw.ellipse([bx - 14, by - 8, bx + 14, by + 8], fill=(45, 120, 45))
        draw.line([(bx - 10, by), (bx + 10, by)], fill=(120, 200, 90), width=2)

    # Balsamic Glaze drizzle
    draw.arc([180, 150, 320, 240], start=10, end=190, fill=(40, 20, 15), width=4)
    draw.arc([270, 160, 420, 250], start=30, end=210, fill=(40, 20, 15), width=4)

    # Lemon slice on side (#F4CE14)
    lemon_bbox = [390, 240, 480, 330]
    draw.chord(lemon_bbox, start=30, end=210, fill=(244, 206, 20), outline=(210, 175, 10), width=4)
    draw.arc(lemon_bbox, start=30, end=210, fill=(255, 250, 200), width=6)

    # Rosemary sprig
    draw.line([(130, 260), (200, 310)], fill=(50, 90, 50), width=4)
    for i in range(5):
        lx = 140 + i * 12
        ly = 270 + i * 8
        draw.line([(lx, ly), (lx - 8, ly + 8)], fill=(60, 110, 55), width=3)
        draw.line([(lx, ly), (lx + 6, ly - 8)], fill=(60, 110, 55), width=3)

    hero_path = os.path.join(ASSETS_DIR, "hero-food.jpg")
    img.save(hero_path, "JPEG", quality=95)
    print(f"Saved hero food: {hero_path}")

# 3. Generate Individual Food Thumbnails
def generate_menu_images():
    items = [
        ("greek-salad.jpg", "GREEK SALAD", (240, 244, 240), [
            ("bowl", (40, 40, 360, 360), (250, 250, 250)),
            ("greens", (80, 80, 320, 320), (76, 140, 68)),
            ("feta", [(150, 140, 190, 180), (210, 130, 250, 170), (180, 200, 220, 240)], (255, 255, 255)),
            ("olives", [(130, 220), (230, 230), (260, 170), (160, 120)], (40, 30, 45)),
            ("tomatoes", [(120, 160), (250, 200), (200, 160), (200, 250)], (225, 45, 35)),
            ("cucumbers", [(170, 180), (220, 180)], (120, 190, 90))
        ]),
        ("bruschetta.jpg", "BRUSCHETTA", (250, 244, 235), [
            ("plate", (40, 40, 360, 360), (245, 240, 235)),
            ("bread", [(100, 140, 300, 260)], (195, 140, 80)),
            ("tomatoes", [(140, 170), (170, 160), (200, 175), (230, 165), (170, 200), (210, 210)], (220, 40, 30)),
            ("basil", [(160, 180), (190, 190), (220, 180)], (45, 125, 45)),
            ("glaze", [(120, 200, 280, 220)], (50, 25, 15))
        ]),
        ("grilled-fish.jpg", "GRILLED FISH", (240, 245, 250), [
            ("plate", (40, 40, 360, 360), (240, 245, 245)),
            ("fish_body", [(90, 190), (200, 130), (300, 190), (280, 230), (180, 240)], (210, 165, 120)),
            ("grill_marks", [((150, 150), (180, 220)), ((190, 145), (220, 225)), ((230, 155), (260, 215))], (90, 50, 30)),
            ("lemon", (260, 210, 320, 270), (244, 206, 20)),
            ("herbs", [(160, 170), (200, 180), (240, 180)], (55, 130, 50))
        ]),
        ("pasta.jpg", "PASTA", (255, 248, 240), [
            ("bowl", (40, 40, 360, 360), (252, 250, 248)),
            ("sauce", (80, 80, 320, 320), (205, 50, 35)),
            ("penne", [(130, 150, 180, 170), (190, 140, 240, 160), (160, 190, 210, 210), (210, 190, 260, 210), (140, 220, 190, 240)], (245, 210, 130)),
            ("parmesan", [(170, 170), (190, 185), (210, 165), (180, 220)], (255, 250, 220)),
            ("basil", [(190, 170)], (50, 130, 50))
        ]),
        ("lemon-dessert.jpg", "LEMON DESSERT", (255, 252, 240), [
            ("plate", (40, 40, 360, 360), (248, 248, 250)),
            ("cake_slice", [(120, 240), (200, 120), (280, 240)], (245, 215, 110)),
            ("cream_top", [(130, 230), (200, 130), (270, 230)], (255, 250, 235)),
            ("lemon_zest", [(180, 170), (200, 160), (220, 175), (195, 190)], (244, 206, 20)),
            ("mint", [(200, 120)], (60, 140, 60))
        ]),
        ("lemonade.jpg", "FRESH LEMONADE", (245, 250, 255), [
            ("glass", [(130, 100), (270, 100), (240, 310), (160, 310)], (248, 225, 80)),
            ("liquid", [(140, 140), (260, 140), (235, 300), (165, 300)], (244, 210, 30)),
            ("ice", [(170, 160, 205, 195), (200, 210, 235, 245)], (255, 255, 255)),
            ("lemon_wheel", (190, 70, 260, 140), (244, 206, 20)),
            ("straw", [((205, 60), (185, 290))], (215, 45, 45)),
            ("mint", [(160, 120)], (50, 130, 50))
        ])
    ]

    for filename, title, bg_color, elements in items:
        size = 400
        img = Image.new("RGB", (size, size), bg_color)
        draw = ImageDraw.Draw(img)

        # Draw decorative plate / base
        draw.ellipse([30, 30, 370, 370], fill=(240, 242, 238), outline=(215, 220, 215), width=6)
        draw.ellipse([50, 50, 350, 350], fill=(250, 251, 249))

        for elem in elements:
            etype = elem[0]
            if etype in ("bowl", "plate", "sauce", "lemon"):
                draw.ellipse(elem[1], fill=elem[2])
            elif etype == "greens":
                draw.ellipse(elem[1], fill=elem[2])
                for off in range(12):
                    ang = off * math.pi / 6
                    ox = int(200 + 70 * math.cos(ang))
                    oy = int(200 + 70 * math.sin(ang))
                    draw.ellipse([ox-25, oy-25, ox+25, oy+25], fill=(85 + off*3, 155 - off*2, 75))
            elif etype in ("feta", "bread", "penne", "ice"):
                for box in elem[1]:
                    draw.rounded_rectangle(box, radius=8, fill=elem[2])
            elif etype in ("olives", "tomatoes", "cucumbers", "basil", "parmesan", "lemon_zest", "mint"):
                color = elem[2]
                radius = 12 if etype in ("olives", "tomatoes") else 14 if etype == "cucumbers" else 8
                for pt in elem[1]:
                    if isinstance(pt, tuple):
                        px, py = pt
                        draw.ellipse([px - radius, py - radius, px + radius, py + radius], fill=color)
            elif etype == "fish_body":
                draw.polygon(elem[1], fill=elem[2])
            elif etype == "grill_marks":
                for line in elem[1]:
                    draw.line(line, fill=elem[2], width=5)
            elif etype == "cake_slice":
                draw.polygon(elem[1], fill=elem[2])
            elif etype == "cream_top":
                draw.polygon(elem[1], fill=elem[2])
            elif etype == "glass":
                draw.polygon(elem[1], fill=(230, 240, 245), outline=(180, 200, 215), width=4)
            elif etype == "liquid":
                draw.polygon(elem[1], fill=elem[2])
            elif etype == "lemon_wheel":
                draw.ellipse(elem[1], fill=elem[2], outline=(220, 180, 10), width=4)
            elif etype == "straw":
                for line in elem[1]:
                    draw.line(line, fill=elem[2], width=8)

        # Gentle subtle vignette / shadow
        draw.ellipse([30, 30, 370, 370], outline=(200, 205, 200), width=2)

        out_path = os.path.join(MENU_DIR, filename)
        img.save(out_path, "JPEG", quality=95)
        print(f"Saved menu image: {out_path}")

# 4. Generate Professional Wireframe Graphic
def generate_wireframe():
    # 3 screens: Onboarding, Home, Profile side-by-side with annotations
    width, height = 1800, 1200
    img = Image.new("RGB", (width, height), (245, 247, 248))
    draw = ImageDraw.Draw(img)

    f_title = get_font("sans_bold", 36)
    f_subtitle = get_font("sans", 20)
    f_screen_title = get_font("sans_bold", 26)
    f_bold = get_font("sans_bold", 18)
    f_regular = get_font("sans", 16)
    f_small = get_font("sans", 14)
    f_tiny = get_font("sans", 12)

    # Main Diagram Header
    draw.text((60, 40), "LITTLE LEMON FOOD ORDERING APP — ARCHITECTURE & WIREFRAME", font=f_title, fill=(35, 45, 42))
    draw.text((60, 88), "Low-fidelity UX Wireframes: Onboarding Screen, Home Screen & Profile Screen | React Native & Expo", font=f_subtitle, fill=(90, 100, 95))
    draw.line([(60, 125), (1740, 125)], fill=(210, 215, 215), width=2)

    # Screen dimensions
    phone_w, phone_h = 480, 960
    screens = [
        (80, 170, "Screen 1: Onboarding"),
        (660, 170, "Screen 2: Home (Menu & Hero)"),
        (1240, 170, "Screen 3: Profile (Account & Settings)")
    ]

    for sx, sy, stitle in screens:
        # Screen title above phone
        draw.text((sx + 20, sy - 35), stitle, font=f_screen_title, fill=(50, 60, 55))
        # Phone frame
        draw.rounded_rectangle([sx, sy, sx + phone_w, sy + phone_h], radius=32, fill=(255, 255, 255), outline=(170, 178, 175), width=4)
        # Notch / Speaker / Camera bar
        draw.rounded_rectangle([sx + phone_w//2 - 60, sy + 10, sx + phone_w//2 + 60, sy + 26], radius=8, fill=(215, 220, 220))

    # --- Screen 1: Onboarding Content ---
    s1_x, s1_y = 80, 170
    # Header Logo
    draw.rounded_rectangle([s1_x + 160, s1_y + 60, s1_x + 320, s1_y + 110], radius=8, fill=(235, 238, 236), outline=(190, 195, 190), width=2)
    draw.text((s1_x + 175, s1_y + 75), "[ Little Lemon Logo ]", font=f_small, fill=(90, 100, 95))
    draw.line([(s1_x + 20, s1_y + 130), (s1_x + phone_w - 20, s1_y + 130)], fill=(230, 230, 230), width=2)

    # Hero / Welcome Banner
    draw.rounded_rectangle([s1_x + 24, s1_y + 150, s1_x + phone_w - 24, s1_y + 310], radius=16, fill=(215, 225, 220))
    draw.text((s1_x + 44, s1_y + 175), "Let us get to know you", font=f_screen_title, fill=(45, 55, 50))
    draw.text((s1_x + 44, s1_y + 220), "Welcome to Little Lemon\nChicago's favorite Mediterranean\ntraditions with a modern culinary twist.", font=f_regular, fill=(70, 80, 75))

    # Form Fields
    draw.text((s1_x + 36, s1_y + 360), "First Name *", font=f_bold, fill=(50, 60, 55))
    draw.rounded_rectangle([s1_x + 36, s1_y + 395, s1_x + phone_w - 36, s1_y + 455], radius=10, fill=(250, 250, 250), outline=(180, 185, 180), width=2)
    draw.text((s1_x + 52, s1_y + 417), "e.g. John", font=f_regular, fill=(160, 165, 160))

    draw.text((s1_x + 36, s1_y + 485), "Email Address *", font=f_bold, fill=(50, 60, 55))
    draw.rounded_rectangle([s1_x + 36, s1_y + 520, s1_x + phone_w - 36, s1_y + 580], radius=10, fill=(250, 250, 250), outline=(180, 185, 180), width=2)
    draw.text((s1_x + 52, s1_y + 542), "e.g. john@example.com", font=f_regular, fill=(160, 165, 160))

    # Help note
    draw.text((s1_x + 36, s1_y + 600), "• Enter a valid email format to enable Next button", font=f_tiny, fill=(120, 130, 125))

    # Next Button at Bottom
    draw.rounded_rectangle([s1_x + 36, s1_y + 850, s1_x + phone_w - 36, s1_y + 910], radius=12, fill=(200, 205, 200))
    draw.text((s1_x + 215, s1_y + 872), "Next", font=f_bold, fill=(100, 110, 105))
    draw.text((s1_x + 130, s1_y + 920), "(Disabled until both fields valid)", font=f_tiny, fill=(140, 145, 140))


    # --- Screen 2: Home Content ---
    s2_x, s2_y = 660, 170
    # Header: Logo + Avatar
    draw.rounded_rectangle([s2_x + 150, s2_y + 50, s2_x + 310, s2_y + 90], radius=8, fill=(240, 240, 240), outline=(200, 200, 200), width=1)
    draw.text((s2_x + 175, s2_y + 62), "[ Little Lemon ]", font=f_small, fill=(80, 90, 85))
    # Avatar circle on top right
    draw.ellipse([s2_x + phone_w - 75, s2_y + 48, s2_x + phone_w - 35, s2_y + 88], fill=(190, 205, 200), outline=(140, 155, 150), width=2)
    draw.text((s2_x + phone_w - 62, s2_y + 60), "AV", font=f_tiny, fill=(50, 60, 55))
    draw.line([(s2_x + 10, s2_y + 100), (s2_x + phone_w - 10, s2_y + 100)], fill=(230, 230, 230), width=1)

    # Hero Section (Dark Green Area in wireframe)
    hero_h = 240
    draw.rectangle([s2_x + 4, s2_y + 101, s2_x + phone_w - 4, s2_y + 101 + hero_h], fill=(100, 115, 110))
    draw.text((s2_x + 24, s2_y + 115), "Little Lemon", font=f_title, fill=(245, 245, 245))
    draw.text((s2_x + 26, s2_y + 160), "Chicago", font=f_bold, fill=(225, 230, 225))
    draw.text((s2_x + 26, s2_y + 190), "We are a family owned\nMediterranean restaurant,\nfocused on traditional recipes\nwith a modern twist.", font=f_tiny, fill=(220, 225, 220))
    # Hero food image box on right
    draw.rounded_rectangle([s2_x + phone_w - 150, s2_y + 160, s2_x + phone_w - 24, s2_y + 270], radius=14, fill=(160, 175, 170), outline=(210, 215, 210), width=2)
    draw.text((s2_x + phone_w - 130, s2_y + 205), "[ Food Image ]", font=f_tiny, fill=(60, 70, 65))

    # Search Bar inside hero
    draw.rounded_rectangle([s2_x + 24, s2_y + 285, s2_x + phone_w - 24, s2_y + 325], radius=10, fill=(255, 255, 255))
    draw.text((s2_x + 42, s2_y + 298), "🔍 Search dishes, descriptions...", font=f_small, fill=(120, 130, 125))

    # Section 3: Menu Breakdown
    draw.text((s2_x + 24, s2_y + 365), "ORDER FOR DELIVERY!", font=f_bold, fill=(40, 50, 45))
    # Horizontal Category Pills
    categories = ["All", "Starters", "Mains", "Desserts", "Drinks"]
    cat_x = s2_x + 24
    for i, cat in enumerate(categories):
        pw = 76 if i == 0 else 82
        is_sel = (i == 1)
        bg = (70, 85, 80) if is_sel else (235, 238, 236)
        fg = (255, 255, 255) if is_sel else (70, 85, 80)
        draw.rounded_rectangle([cat_x, s2_y + 400, cat_x + pw, s2_y + 435], radius=14, fill=bg)
        draw.text((cat_x + 14, s2_y + 410), cat, font=f_tiny, fill=fg)
        cat_x += pw + 8

    draw.line([(s2_x + 20, s2_y + 455), (s2_x + phone_w - 20, s2_y + 455)], fill=(225, 230, 225), width=2)

    # Section 4: Food Menu List Items
    menu_items = [
        ("Greek Salad", "Famous salad with crispy lettuce, peppers, olives...", "$12.99"),
        ("Bruschetta", "Grilled bread topped with tomatoes, garlic, basil...", "$7.99"),
        ("Grilled Fish", "Fresh catch with herbs, lemon, vegetables...", "$20.00"),
        ("Pasta", "Penne with tomato sauce, fresh chilli, Parmesan...", "$18.99")
    ]
    iy = s2_y + 475
    for m_name, m_desc, m_price in menu_items:
        draw.text((s2_x + 24, iy), m_name, font=f_bold, fill=(40, 50, 45))
        draw.text((s2_x + 24, iy + 26), m_desc, font=f_tiny, fill=(110, 120, 115))
        draw.text((s2_x + 24, iy + 52), m_price, font=f_bold, fill=(70, 85, 80))
        # Food thumbnail
        draw.rounded_rectangle([s2_x + phone_w - 105, iy - 2, s2_x + phone_w - 25, iy + 74], radius=12, fill=(225, 230, 225), outline=(190, 195, 190), width=1)
        draw.text((s2_x + phone_w - 88, iy + 30), "[Thumb]", font=f_tiny, fill=(120, 130, 125))
        draw.line([(s2_x + 24, iy + 92), (s2_x + phone_w - 24, iy + 92)], fill=(235, 238, 236), width=1)
        iy += 112


    # --- Screen 3: Profile Content ---
    s3_x, s3_y = 1240, 170
    # Header: Back Arrow + Logo + Avatar
    draw.text((s3_x + 25, s3_y + 58), "← Back", font=f_bold, fill=(70, 85, 80))
    draw.rounded_rectangle([s3_x + 160, s3_y + 50, s3_x + 320, s3_y + 90], radius=8, fill=(240, 240, 240))
    draw.text((s3_x + 185, s3_y + 62), "[ Little Lemon ]", font=f_small, fill=(80, 90, 85))
    draw.ellipse([s3_x + phone_w - 75, s3_y + 48, s3_x + phone_w - 35, s3_y + 88], fill=(190, 205, 200))
    draw.line([(s3_x + 10, s3_y + 100), (s3_x + phone_w - 10, s3_y + 100)], fill=(230, 230, 230), width=1)

    # Personal Information Heading
    draw.text((s3_x + 24, s3_y + 120), "Personal Information", font=f_bold, fill=(40, 50, 45))
    draw.text((s3_x + 24, s3_y + 155), "Avatar", font=f_small, fill=(110, 120, 115))

    # Avatar row
    draw.ellipse([s3_x + 24, s3_y + 180, s3_x + 94, s3_y + 250], fill=(210, 220, 215), outline=(160, 170, 165), width=2)
    draw.text((s3_x + 46, s3_y + 206), "JD", font=f_bold, fill=(60, 70, 65))
    # Change / Remove buttons
    draw.rounded_rectangle([s3_x + 115, s3_y + 195, s3_x + 215, s3_y + 235], radius=8, fill=(70, 85, 80))
    draw.text((s3_x + 138, s3_y + 208), "Change", font=f_small, fill=(255, 255, 255))
    draw.rounded_rectangle([s3_x + 230, s3_y + 195, s3_x + 325, s3_y + 235], radius=8, fill=(245, 245, 245), outline=(190, 195, 190), width=1)
    draw.text((s3_x + 252, s3_y + 208), "Remove", font=f_small, fill=(90, 100, 95))

    # Form fields
    fields = [
        ("First name", "John"),
        ("Last name", "Doe"),
        ("Email", "john.doe@example.com"),
        ("Phone number", "(555) 234-5678")
    ]
    fy = s3_y + 270
    for flabel, fval in fields:
        draw.text((s3_x + 24, fy), flabel, font=f_small, fill=(100, 110, 105))
        draw.rounded_rectangle([s3_x + 24, fy + 24, s3_x + phone_w - 24, fy + 64], radius=8, fill=(250, 250, 250), outline=(200, 205, 200), width=1)
        draw.text((s3_x + 36, fy + 38), fval, font=f_regular, fill=(45, 55, 50))
        fy += 76

    # Email Notifications Section
    draw.text((s3_x + 24, fy + 10), "Email notifications", font=f_bold, fill=(40, 50, 45))
    fy += 45
    checkboxes = ["Order statuses", "Password changes", "Special offers", "Newsletter"]
    for cb in checkboxes:
        draw.rounded_rectangle([s3_x + 26, fy + 2, s3_x + 46, fy + 22], radius=4, fill=(70, 85, 80))
        draw.text((s3_x + 31, fy + 4), "✓", font=f_small, fill=(255, 255, 255))
        draw.text((s3_x + 58, fy + 4), cb, font=f_regular, fill=(60, 70, 65))
        fy += 34

    # Log out button
    draw.rounded_rectangle([s3_x + 24, fy + 12, s3_x + phone_w - 24, fy + 56], radius=10, fill=(244, 206, 20))
    draw.text((s3_x + 195, fy + 25), "Log out", font=f_bold, fill=(45, 55, 50))

    # Discard and Save Changes row
    draw.rounded_rectangle([s3_x + 24, fy + 72, s3_x + 220, fy + 116], radius=10, fill=(255, 255, 255), outline=(180, 190, 185), width=2)
    draw.text((s3_x + 68, fy + 85), "Discard changes", font=f_small, fill=(80, 90, 85))

    draw.rounded_rectangle([s3_x + 240, fy + 72, s3_x + phone_w - 24, fy + 116], radius=10, fill=(70, 85, 80))
    draw.text((s3_x + 295, fy + 85), "Save changes", font=f_small, fill=(255, 255, 255))

    # Save to wireframes directory
    wireframe_path = os.path.join(WIREFRAMES_DIR, "little-lemon-wireframe.jpg")
    img.save(wireframe_path, "JPEG", quality=95)
    print(f"Saved wireframe: {wireframe_path}")

def generate_app_icons():
    # 1024x1024 App Icon
    size = 1024
    icon = Image.new("RGBA", (size, size), (73, 94, 87, 255))
    draw = ImageDraw.Draw(icon)

    cx, cy = size // 2, size // 2 - 40
    # Lemon body
    draw.ellipse([cx - 280, cy - 200, cx + 280, cy + 200], fill=(244, 206, 20, 255), outline=(225, 185, 10, 255), width=12)
    draw.polygon([(cx - 320, cy), (cx - 240, cy - 60), (cx - 240, cy + 60)], fill=(244, 206, 20, 255))
    draw.polygon([(cx + 320, cy), (cx + 240, cy - 60), (cx + 240, cy + 60)], fill=(244, 206, 20, 255))
    # Green leaf
    draw.ellipse([cx + 50, cy - 310, cx + 300, cy - 140], fill=(255, 255, 255, 230))
    draw.line([cx + 70, cy - 225, cx + 280, cy - 225], fill=(73, 94, 87, 255), width=8)

    # Wordmark
    f_brand = get_font("serif_bold", 96)
    draw.text((cx - 340, cy + 290), "LITTLE LEMON", font=f_brand, fill=(244, 206, 20, 255))

    icon.save(os.path.join(ASSETS_DIR, "icon.png"), "PNG")
    icon.save(os.path.join(ASSETS_DIR, "splash-icon.png"), "PNG")
    icon.save(os.path.join(ASSETS_DIR, "android-icon-foreground.png"), "PNG")
    print("Saved branded app icons and splash icons!")

if __name__ == "__main__":
    generate_logo()
    generate_hero_food()
    generate_menu_images()
    generate_wireframe()
    generate_app_icons()
    print("All assets successfully generated!")

