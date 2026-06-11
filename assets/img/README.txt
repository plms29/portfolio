Put your photos and project screenshots here.

- Headshot / event photos: any name you like, then reference it from data/content.js.
- Project screenshots: name them clearly (e.g. learnlocal.jpg) and point the badge's
  `image` field at "assets/img/learnlocal.jpg".

Tip: keep images reasonably sized (under ~300 KB each) so the site stays fast.
Until you add a real file, badges with a "REPLACE-..." image path show a labelled
placeholder block instead of a broken image.

-------------------------------------------------------------------
PHOTO SLOTS (added) — where each picture shows up on the site
-------------------------------------------------------------------
Each slot currently shows a labelled placeholder. To use a real photo:
drop the file in this folder, then in data/content.js change the path
so it no longer contains the word "REPLACE" (e.g. point it at the new
file name). That's the only change needed.

  HERO portrait .......... content.js: portrait      → e.g. assets/img/portrait.jpg
  ABOUT candid photo ..... content.js: aboutImage    → e.g. assets/img/about.jpg
  ACTIVITY photos ........ content.js: activities[].image
        Free Coding Club ...... coding-club.jpg
        Robotics Team ......... robotics.jpg
        Volunteer Tutor ....... tutor.jpg
        School Magazine ....... magazine.jpg
  GALLERY (6 tiles) ...... content.js: gallery[].src → gallery-1.jpg … gallery-6.jpg
  PROJECT screenshots .... content.js: badges[].image (learnlocal.jpg, hackathon.jpg, …)
  DETAIL-PAGE images ..... content.js: badges[].page.blocks (cover / inline images)

Tips: square or 4:5 images look best for the portrait & gallery; 16:9 for
activity thumbnails. Keep each file under ~300 KB so the site stays fast.
Add or remove gallery tiles freely by editing the gallery array.
