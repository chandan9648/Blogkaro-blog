# Blogkaro
Blogging website based on Mern stack

Folder structure

├── .gitignore
├── Backend
    ├── .gitignore
    ├── config
    │   ├── cloudinary.js
    │   ├── db.js
    │   └── gamini.js
    ├── controllers
    │   ├── adminController.js
    │   ├── blogController.js
    │   ├── commentController.js
    │   └── userController.js
    ├── middleware
    │   ├── authMiddleware.js
    │   └── multer.js
    ├── models
    │   ├── Blog.js
    │   ├── Comment.js
    │   └── User.js
    ├── package-lock.json
    ├── package.json
    ├── routes
    │   ├── adminRoutes.js
    │   ├── blogRoutes.js
    │   ├── commentRoutes.js
    │   └── userRoutes.js
    ├── server.js
    └── uploads
    │   ├── 1750832647747.jpg
    │   ├── 1750832944828.jpg
    │   ├── 1750832946005.jpg
    │   ├── 1750832947375.jpg
    │   ├── 1750832948234.jpg
    │   ├── 1750832948943.jpg
    │   ├── 1750832962571.jpg
    │   ├── 1750832966932.jpg
    │   ├── 1750833968347.jpg
    │   ├── 1750834108371.jpg
    │   ├── 1750834231206.jpg
    │   ├── 1750834353307.jpg
    │   ├── 1750834476732.jpg
    │   ├── 1750835496575.jpg
    │   ├── 1751100379740.png
    │   ├── 1751101413298.png
    │   ├── 1751101960387.png
    │   ├── 1751103017339.png
    │   ├── 1751103539675.png
    │   ├── 1751104171541.png
    │   ├── 1751104650356.png
    │   ├── 1751105803236.png
    │   ├── 1751105830264.png
    │   ├── 1751106038053.png
    │   ├── 1751106678993.png
    │   ├── 1751107198524.png
    │   ├── 1751107353543.png
    │   ├── 1751107690657.png
    │   ├── 1751107770872.png
    │   ├── 1751107925067.png
    │   ├── 1751108152128.png
    │   ├── 1751108345204.png
    │   ├── 1751108356150.png
    │   ├── 1751108592942.png
    │   ├── 1751108688854.png
    │   ├── 1751108783781.png
    │   ├── 1751109064721.png
    │   ├── 1751109212161.png
    │   ├── 1751109519160.png
    │   ├── 1751176363195.png
    │   ├── 1751470472174.png
    │   ├── 1751538839884.png
    │   ├── 1751541219225.png
    │   ├── 1751549248510.png
    │   ├── 1751549339677.png
    │   ├── 1751551052002.png
    │   ├── 1751552252687.png
    │   ├── 1751552983366.png
    │   ├── 1751553249392.png
    │   ├── 1751553865502.png
    │   ├── 1751553927456.png
    │   ├── 1751555066610.png
    │   ├── 1751557343805.png
    │   ├── 1751870178429.png
    │   ├── 1752494850849.png
    │   ├── 1752567134745.png
    │   ├── 1756009059602.jpg
    │   ├── 1756009098713.jpg
    │   ├── 1756009162303.jpg
    │   ├── 1756009186163.jpg
    │   ├── 1756022460911.jpg
    │   ├── 1756022716380.jpg
    │   ├── 1756022915653.jpg
    │   ├── 1756024168382.jpg
    │   ├── 1756024456549.jpg
    │   ├── 1756024651976.jpg
    │   ├── 1756025702541.jpg
    │   ├── 1756025949905.jpg
    │   ├── 1756029153350.jpg
    │   ├── 1756030730061.jpg
    │   ├── 1756674066249.png
    │   ├── 1756674379077.jpeg
    │   ├── 1756674654521.png
    │   ├── 1756675065961.jpeg
    │   └── 1756675282805.png
├── Frontend
    ├── .gitignore
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── BlogKaro.png
    │   ├── favicon.svg
    │   └── vite.svg
    ├── src
    │   ├── App.jsx
    │   ├── assets
    │   │   ├── add_icon.svg
    │   │   ├── arrow.svg
    │   │   ├── assets.js
    │   │   ├── bin_icon.svg
    │   │   ├── blog_icon.png
    │   │   ├── blog_pic_1.png
    │   │   ├── blog_pic_10.png
    │   │   ├── blog_pic_2.png
    │   │   ├── blog_pic_3.png
    │   │   ├── blog_pic_4.png
    │   │   ├── blog_pic_5.png
    │   │   ├── blog_pic_6.png
    │   │   ├── blog_pic_7.png
    │   │   ├── blog_pic_8.png
    │   │   ├── blog_pic_9.png
    │   │   ├── blogkaro.svg
    │   │   ├── comment_icon.svg
    │   │   ├── cross_icon.svg
    │   │   ├── dashboard_icon_1.svg
    │   │   ├── dashboard_icon_2.svg
    │   │   ├── dashboard_icon_3.svg
    │   │   ├── dashboard_icon_4.svg
    │   │   ├── email_icon.png
    │   │   ├── facebook_icon.svg
    │   │   ├── favicon.svg
    │   │   ├── googleplus_icon.svg
    │   │   ├── gradientBackground.png
    │   │   ├── home_icon.svg
    │   │   ├── list_icon.svg
    │   │   ├── logo.svg
    │   │   ├── logo_light.svg
    │   │   ├── react.svg
    │   │   ├── rich-text-css.txt
    │   │   ├── star_icon.svg
    │   │   ├── tick_icon.svg
    │   │   ├── twitter_icon.svg
    │   │   ├── upload_area.svg
    │   │   └── user_icon.svg
    │   ├── components
    │   │   ├── BlogCard.jsx
    │   │   ├── BlogList.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Header.jsx
    │   │   ├── Loader.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── Newsletter.jsx
    │   │   ├── RequireAdmin.jsx
    │   │   ├── admin
    │   │   │   ├── BlogTableItem.jsx
    │   │   │   ├── CommentTableItem.jsx
    │   │   │   ├── Sidebar.jsx
    │   │   │   └── UserCard.jsx
    │   │   └── user
    │   │   │   ├── BlogTableItem.jsx
    │   │   │   ├── CommentTableItem.jsx
    │   │   │   └── Sidebar.jsx
    │   ├── context
    │   │   └── AppContext.jsx
    │   ├── index.css
    │   ├── main.jsx
    │   └── pages
    │   │   ├── Blog.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── admin
    │   │       ├── AdminDashboard.jsx
    │   │       ├── AdminLayout.jsx
    │   │       ├── AdminListBlog.jsx
    │   │       ├── CommentManage.jsx
    │   │       └── UserManagement.jsx
    │   │   └── user
    │   │       ├── AddBlog.jsx
    │   │       ├── Comments.jsx
    │   │       ├── Layout.jsx
    │   │       └── ListBlog.jsx
    └── vite.config.js
└── README.md


