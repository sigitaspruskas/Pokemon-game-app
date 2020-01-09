##Simple Pokemon fight game project##
**This project was written as one of the tasks for Advanced JS course (In CodeAcademy). It is written in Vanilla JavaScript.**

**Some points on project:**
- Data is saved in web browsers localstorage, to focus on JavaScript code writing.
- No significant animations since I wanted to focus on game logics.
- If a player visits app for the first time, he must register before being able to choose Pokemon character, and play. If he already is registered, his data is loaded from localstorage. This method acts as some sort of a cookie.
- Once you choose your Pokemon, you cannot change it.
- Pokemon has some basic attack and defense stats, as well as level. Your enemies are generated with random stats, depending on your Pokemon level.
- When fighting, you get exp points depending on the result. 2 for win, 0 or 1 (selected at random) for loss. You can spend exp points to upgrade our Pokemon stats.
- When your stats reach certain point, your pokemon gets level upgrade.
- When leveling up, amount of exp points to upgrade a stat, increases.

###To Do List###
- [ ] Running on node.js server;
- [ ] Clean directory and file structure;
- [ ] Responsive design;
- [ ] Implement Pokemon API;
- [ ] Implement Lazy loading and infinite scroll for character selection;
- [x] Save game and player data to localstorage;
- [x] Basic fight simulation math;

