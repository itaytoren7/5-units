# Known bugs (noted, not fixed yet)

- יומן הטעויות מקשר כל טעות עם `problemId` אל `/practice/<id>`, גם כשה-id הוא של תרגיל בשיעור (למשל `trig-sine-law-3`), ואז מגיעים לדף "לא נמצא". צריך לקשר דרך `reviewLink`-דומה שמזהה גם תרגילי שיעורים.
