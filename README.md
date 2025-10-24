# Portfolio Website

A modern, responsive portfolio and blog website built with HTML, CSS, and JavaScript. Designed to be deployed on GitHub Pages with custom domain support.

## Features

- 🎨 Modern, clean design with responsive layout
- 📱 Mobile-first approach with excellent mobile experience
- 🚀 Fast loading with optimized performance
- 📝 Built-in blog functionality with search and filtering
- 🔍 SEO optimized with Open Graph and Twitter Card support
- ♿ Accessibility features following WCAG guidelines
- 🌙 Dark mode support (respects system preference)
- 💌 Contact form with validation
- 📊 Google Analytics ready
- 🔧 Easy to customize and maintain

## Structure

```
portfolio/
├── index.html              # Main portfolio page
├── blog/
│   ├── index.html          # Blog listing page
│   └── *.html              # Individual blog posts
├── assets/
│   ├── css/
│   │   ├── style.css       # Main styles
│   │   ├── blog.css        # Blog-specific styles
│   │   └── blog-post.css   # Individual post styles
│   ├── js/
│   │   ├── main.js         # Main functionality
│   │   └── blog.js         # Blog functionality
│   └── images/             # Images directory
├── CNAME                   # Custom domain configuration
└── README.md              # This file
```

## Setup Instructions

### 1. Fork or Clone Repository

```bash
git clone https://github.com/jeff-vincent/portfolio.git
cd portfolio
```

### 2. Customize Content

1. **Personal Information**: Update name, bio, and contact details in `index.html`
2. **Projects**: Replace project examples with your own work
3. **Blog Posts**: Add your own blog posts in the `blog/` directory
4. **Images**: Add your profile photo and project images to `assets/images/`
5. **Contact Links**: Update social media and contact information

### 3. Custom Domain Setup (Optional)

If you want to use a custom domain:

1. Update the `CNAME` file with your domain name
2. Configure your domain's DNS to point to GitHub Pages
3. Update all meta tags and Open Graph URLs with your domain

### 4. Deploy to GitHub Pages

1. Push your changes to GitHub
2. Go to repository Settings → Pages
3. Select "Deploy from a branch" 
4. Choose "main" branch and "/ (root)" folder
5. Save settings

Your site will be available at `https://yourusername.github.io/portfolio` or your custom domain.

## Customization Guide

### Colors and Theming

The color scheme is defined in CSS custom properties in `assets/css/style.css`:

```css
:root {
    --primary-color: #2563eb;
    --primary-dark: #1d4ed8;
    --primary-light: #3b82f6;
    /* ... other colors */
}
```

### Adding Blog Posts

1. Create a new HTML file in the `blog/` directory
2. Use `blog/modern-web-development-practices.html` as a template
3. Update the blog listing in `blog/index.html`
4. Update the featured posts on the main page

### Contact Form

The contact form includes client-side validation but needs a backend service for actual email sending. Consider using:

- [Formspree](https://formspree.io/)
- [Netlify Forms](https://www.netlify.com/products/forms/)
- [EmailJS](https://www.emailjs.com/)

### Analytics

To add Google Analytics:

1. Get your Google Analytics tracking ID
2. Add the tracking code to the `<head>` section of all HTML files

## Performance Features

- Optimized images with lazy loading
- Minified CSS and JavaScript (recommended for production)
- Service Worker ready for PWA features
- Critical CSS inlining capability
- Font display optimization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Contributing

If you find any issues or have suggestions for improvements:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

- Icons: [Font Awesome](https://fontawesome.com/)
- Fonts: [Google Fonts (Inter)](https://fonts.google.com/specimen/Inter)
- Code highlighting: [Prism.js](https://prismjs.com/)

---

Built with ❤️ by [Jeff Vincent](https://github.com/jeff-vincent)
