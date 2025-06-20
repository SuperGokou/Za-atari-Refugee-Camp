

# 📊 Za’atari Refugee Camp Visualizations

This project is part of the CS171 data visualization course. It visualizes population trends and shelter types in the Za’atari Refugee Camp in Jordan using D3.js. The assignment consists of an area chart for population over time and a bar chart for shelter distribution.

---

## 📁 Project Structure


	├── Za’atari Refugee/
	│ ├── index.html # Main HTML file for visualizations
	│ ├── css/
	│ │ └── style.css # Custom styles
	│ ├── js/
	│ │ └── main.js # D3 scripts for charts
	│ ├── assets/
	│ │ ├── zaatari-refugee-camp-population.csv
	│ │ └── images (e.g., cs171-hw5-preview.png)
	│ └── sketches.pdf # Hand-drawn sketch of visualization ideas
	

---

## 📈 Visualizations

### 1. Area Chart — Population Over Time
- Data: `zaatari-refugee-camp-population.csv`
- Time range: Jan 2013 – Nov 2015
- Y-axis: Number of registered refugees
- X-axis: Time (formatted as Month Year)
- Features:
  - D3 margin convention
  - Tooltips showing date and population
  - Dynamic mouse interaction
  - Styled axes and gridlines

### 2. Bar Chart — Shelter Type Distribution
- Categories:
  - Caravans: 79.68%
  - Mixed (Tent + Caravan): 10.81%
  - Tents: 9.51%
- Y-axis: Percentage
- X-axis: Shelter type (ordinal)
- Features:
  - Labels above bars
  - Axis formatting as percentages
  - Custom color scheme

---

## 📋 Instructions

1. Clone the repository or download the files.
2. Open `index.html` in a modern browser.
3. Make sure the file paths to CSS, JS, and CSV data are correct.
4. The `main.js` file dynamically loads and renders the charts using D3.js v6.

---

## 🧪 Dependencies

- [D3.js v6](https://d3js.org)
- Bootstrap 5.3 (CDN)
- Compatible with all modern browsers.

---

## 🖼️ Preview

![Homework Preview](assets/cs171-hw5-preview.png)

---

## ✍️ Sketches

Please see `sketches.pdf` for hand-drawn visualization planning.

---

## 🏆 Extra Credit: Dear Data

If applicable, the `dear_data/` folder contains:
- Personal data collection for 5+ days
- At least 3 observations per day
- Each row includes ≥5 attributes (e.g., date, time, category, context, sentiment)

---

## 📩 Submission

Submit the `.zip` file `submission_week_04_FirstnameLastname.zip` on Canvas. Keep the total file size under 5MB.

---

## 🎉 Congratulations!

You’ve completed Week 04’s D3.js assignment on real-world humanitarian data. You're one step closer to mastering interactive data visualization!
