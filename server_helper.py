import random


def deltaE(rgbA, rgbB):
    labA = rgb2lab(rgbA)
    labB = rgb2lab(rgbB)
    deltaL = labA[0] - labB[0]
    deltaA = labA[1] - labB[1]
    deltaB = labA[2] - labB[2]
    c1 = (labA[1] * labA[1] + labA[2] * labA[2]) ** (0.5)
    c2 = (labB[1] * labB[1] + labB[2] * labB[2]) ** (0.5)
    deltaC = c1 - c2
    deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC
    deltaH = 0 if deltaH < 0 else (deltaH) ** (0.5)
    sc = 1.0 + 0.045 * c1
    sh = 1.0 + 0.015 * c1
    deltaLKlsl = deltaL / (1.0)
    deltaCkcsc = deltaC / (sc)
    deltaHkhsh = deltaH / (sh)
    i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh
    return 0 if i < 0 else (i) ** (0.5)


def rgb2lab(rgb):
    r = rgb[0] / 255
    g = rgb[1] / 255
    b = rgb[2] / 255
    r = ((r + 0.055) / 1.055) ** (2.4) if (r > 0.04045) else r / 12.92
    g = ((g + 0.055) / 1.055) * (2.4) if (g > 0.04045) else g / 12.92
    b = ((b + 0.055) / 1.055) * (2.4) if (b > 0.04045) else b / 12.92
    x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047
    y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000
    z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883
    x = (x) ** (1 / 3) if (x > 0.008856) else (7.787 * x) + 16 / 116
    y = (y) ** (1 / 3) if (y > 0.008856) else (7.787 * y) + 16 / 116
    z = (z) ** (1 / 3) if (z > 0.008856) else (7.787 * z) + 16 / 116
    return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]


def generate_basic(q, page_id, op):
    solution = random.randint(0, 255)
    q["solution"] = "(%s,%s,%s)" % (solution, solution, solution)
    q["id"] = page_id + 1
    if op == 1:
        q["words"] = "Identify the RGB values (it doesn't have to be exact)"
    else:
        q["options"] = ["(%s,%s,%s)" % (solution, solution, solution)]
        q["words"] = "(%s,%s,%s) is:" % (solution, solution, solution)

        i = 0
        while i < 2:
            x = random.randint(0, 255)
            while deltaE([solution, solution, solution], [x, x, x]) <= 5:
                x = random.randint(0, 255)
            q["options"].append("(%s,%s,%s)" % (x, x, x))
            i = i + 1
        random.shuffle(q["options"])

    return q


def generate_rg(q, page_id, op):
    solution1 = random.randint(0, 255)
    solution2 = random.randint(0, 255)
    q["solution"] = "(%s,%s,%s)" % (solution1, solution2, 0)
    q["id"] = page_id + 1
    if op == 1:
        q["words"] = "Identify the RGB values (it doesn't have to be exact)"
    else:
        q["options"] = ["(%s,%s,%s)" % (solution1, solution2, 0)]
        q["words"] = "(%s,%s,%s) is:" % (solution1, solution2, 0)
        i = 0
        while i < 2:
            x = random.randint(0, 255)
            y = random.randint(0, 255)
            z = random.randint(0, 255)
            while deltaE([solution1, solution2, 0], [x, y, z]) <= 5 or x == y == z:
                print(x, y, z)
                x = random.randint(0, 255)
                y = random.randint(0, 255)
                z = random.randint(0, 255)
            q["options"].append("(%s,%s,%s)" % (x, y, z))
            i = i + 1
        random.shuffle(q["options"])
    return q


def generate_rb(q, page_id, op):
    solution1 = random.randint(0, 255)
    solution2 = random.randint(0, 255)
    q["solution"] = "(%s,%s,%s)" % (solution1, 0, solution2)
    q["id"] = page_id + 1
    if op == 1:
        q["words"] = "Identify the RGB values (it doesn't have to be exact)"

    else:
        q["options"] = ["(%s,%s,%s)" % (solution1, 0, solution2)]
        q["words"] = "(%s,%s,%s) is:" % (solution1, 0, solution2)
        i = 0
        while i < 2:
            x = random.randint(0, 255)
            y = random.randint(0, 255)
            z = random.randint(0, 255)
            while deltaE([solution1, 0, solution2], [x, y, z]) <= 5 or x == y == z:
                print(x, y, z)
                x = random.randint(0, 255)
                y = random.randint(0, 255)
                z = random.randint(0, 255)
            q["options"].append("(%s,%s,%s)" % (x, y, z))
            i = i + 1
        random.shuffle(q["options"])

    return q


def generate_gb(q, page_id, op):
    solution1 = random.randint(0, 255)
    solution2 = random.randint(0, 255)
    q["solution"] = "(%s,%s,%s)" % (0, solution1, solution2)
    q["id"] = page_id + 1
    if op == 1:
        q["words"] = "Identify the RGB values (it doesn't have to be exact)"
    else:
        q["options"] = ["(%s,%s,%s)" % (0, solution1, solution2)]
        q["words"] = "(%s,%s,%s) is:" % (0, solution1, solution2)
        i = 0
        while i < 2:
            x = random.randint(0, 255)
            y = random.randint(0, 255)
            z = random.randint(0, 255)
            while deltaE([0, solution1, solution2], [x, y, z]) <= 5 or x == y == z:
                print(x, y, z)
                x = random.randint(0, 255)
                y = random.randint(0, 255)
                z = random.randint(0, 255)
            q["options"].append("(%s,%s,%s)" % (x, y, z))
            i = i + 1
        random.shuffle(q["options"])
    return q


def generate_rgb(q, page_id, op):
    solution1 = random.randint(0, 255)
    solution2 = random.randint(0, 255)
    solution3 = random.randint(0, 255)
    q["solution"] = "(%s,%s,%s)" % (solution1, solution2, solution3)
    q["id"] = page_id + 1
    if op == 1:
        q["words"] = "Identify the RGB values (it doesn't have to be exact)"
    else:
        q["options"] = ["(%s,%s,%s)" % (solution1, solution2, solution3)]
        q["words"] = "(%s,%s,%s) is:" % (solution1, solution2, solution3)
        i = 0
        while i < 2:
            x = random.randint(0, 255)
            y = random.randint(0, 255)
            z = random.randint(0, 255)
            while (
                deltaE([solution1, solution2, solution3], [x, y, z]) <= 5 or x == y == z
            ):
                print(x, y, z)
                x = random.randint(0, 255)
                y = random.randint(0, 255)
                z = random.randint(0, 255)
            q["options"].append("(%s,%s,%s)" % (x, y, z))
            i = i + 1
        random.shuffle(q["options"])
    return q
