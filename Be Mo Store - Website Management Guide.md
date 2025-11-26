# Be Mo Store - Website Management Guide

## Table of Contents

1. [Project Overview](#project-overview)
2. [Project Structure](#project-structure)
3. [Key Features](#key-features)
4. [How to Manage the Website](#how-to-manage-the-website)
5. [Making Changes](#making-changes)
6. [Deployment](#deployment)
7. [Troubleshooting](#troubleshooting)

---

## Project Overview

**Be Mo Store** is a digital products and services marketplace built with modern web technologies. It allows users to browse, purchase, and download high-quality templates (CVs, presentations, spreadsheets, etc.), while enabling sellers to upload and sell their own templates.

### Technology Stack

| Component | Technology |
|-----------|-----------|
| Frontend | React 19 + TypeScript |
| Styling | Tailwind CSS 4 |
| Backend | Node.js/Express |
| API | tRPC (Type-safe RPC) |
| Database | MySQL |
| Payment Gateway | Paymob |
| Hosting | Manus |

### Branding Colors

- **Primary Color:** Deep Navy (#0B3D91)
- **Accent Color:** Coral (#FF6B6B)
- **Background:** Light (#F8F9FB)
- **Text:** Dark Slate (#1E293B)

---

## Project Structure

```
bemo_store/
├── App.tsx                 # Main application component with routing
├── Home.tsx               # Landing page (original version)
├── Home_improved.tsx      # Improved landing page with better graphics
├── ProductDetail.tsx      # Product detail page
├── SellerRegister.tsx     # Seller registration form
├── SellerDashboard.tsx    # Seller dashboard
├── index.css              # Global styles and CSS variables
├── db.ts                  # Database schema and configuration
├── routers.ts             # API route definitions
├── schema.ts              # Data type definitions
├── pasted_content.txt     # Project documentation and TODO list
└── MANAGEMENT_GUIDE.md    # This file
```

### Key Files Explained

**App.tsx** - The main routing component that defines all application routes:
- `/` - Home page
- `/store` - Product store/catalog
- `/product/:id` - Individual product details
- `/seller/register` - Seller registration
- `/seller/dashboard` - Seller dashboard
- `/buyer/dashboard` - Buyer dashboard
- `/checkout/:orderId` - Checkout page

**Home.tsx** - The landing page that introduces the marketplace. It includes:
- Header with navigation and sign-in button
- Hero section with call-to-action buttons
- Features section highlighting key benefits
- Popular categories grid
- Call-to-action section
- Footer with links

**Home_improved.tsx** - An enhanced version of the landing page with:
- Better logo design (gradient background)
- Improved visual hierarchy
- Better spacing and typography
- Enhanced hover effects
- More professional appearance

**index.css** - Contains all global styles and CSS variables for the theme, including:
- Color definitions (primary, accent, background, etc.)
- Responsive container utilities
- Dark mode support
- Base layer styles

---

## Key Features

### For Buyers

1. **Browse Templates** - Search and filter templates by category, price, and rating
2. **Product Details** - View detailed information, reviews, and ratings
3. **Secure Checkout** - Purchase templates using Paymob payment gateway
4. **Instant Downloads** - Download purchased templates immediately
5. **Buyer Dashboard** - Track purchases and download history

### For Sellers

1. **Seller Registration** - Apply to become a seller
2. **Product Upload** - Create and upload templates with descriptions and pricing
3. **Seller Dashboard** - Monitor sales, revenue, and product performance
4. **Payout Management** - Request and track payouts
5. **Commission Structure** - Earn 80% of sales (20% platform commission)

### Admin Features

1. **Seller Approval** - Approve or reject seller applications
2. **Product Moderation** - Review and approve products
3. **Order Management** - Track and manage orders
4. **Analytics** - View sales, revenue, and user statistics
5. **Payout Processing** - Process seller payouts

---

## How to Manage the Website

### Updating the Project Name

The project has been renamed from "TemplateHub" to "Be Mo store". If you need to change it again:

1. **Update Home.tsx** - Change the `<h1>` tag and footer text
2. **Update index.css** - Change the comment at the top
3. **Update pasted_content.txt** - Change the project name in documentation
4. **Update any other references** - Search for the old name throughout the codebase

### Changing Colors and Branding

Edit the color variables in **index.css**:

```css
:root {
  /* Primary color (Deep Navy) */
  --primary: oklch(0.42 0.18 265);
  
  /* Accent color (Coral) */
  --accent: oklch(0.65 0.22 25);
  
  /* Background color */
  --background: oklch(0.98 0.001 286.375);
  
  /* Text color */
  --foreground: oklch(0.15 0.02 280);
}
```

### Updating the Logo

The logo is currently a simple "B" in a box. To improve it:

1. **Option 1:** Replace with an image
   - Create a logo image file
   - Import it in Home.tsx
   - Replace the `<div>` with an `<img>` tag

2. **Option 2:** Use a custom SVG
   - Create an SVG component
   - Import and use it in the header

### Adding New Pages

To add a new page (e.g., About page):

1. Create a new file: `About.tsx`
2. Add the route in `App.tsx`:
   ```tsx
   <Route path={"/about"} component={About} />
   ```
3. Add navigation link in `Home.tsx` header

### Modifying the Landing Page

The landing page can be customized by editing **Home.tsx**:

- **Hero Section** - Change the main heading and description
- **Features** - Add or remove feature cards
- **Categories** - Modify the category list
- **CTA Section** - Change the call-to-action text and button

### Database Management

Database operations are handled in **db.ts**. To modify the database:

1. Update the schema in **schema.ts**
2. Create a migration file
3. Run the migration
4. Update the API routers in **routers.ts**

### API Management

API endpoints are defined in **routers.ts**. Key endpoints include:

- `product.getById` - Get product details
- `product.create` - Create a new product
- `order.create` - Create an order
- `seller.register` - Register as a seller
- `review.getByProductId` - Get product reviews

---

## Making Changes

### Step-by-Step: Update the Landing Page

1. Open **Home.tsx** in your code editor
2. Locate the section you want to change (Hero, Features, Categories, etc.)
3. Modify the text, styling, or structure
4. Save the file
5. Test the changes locally (if you have a development environment)
6. Deploy to production

### Step-by-Step: Change Colors

1. Open **index.css**
2. Find the `:root` section
3. Update the color values using OKLCH format or hex codes
4. Save the file
5. The changes will apply to all components using the CSS variables

### Step-by-Step: Add a New Feature

1. Create a new component file (e.g., `NewFeature.tsx`)
2. Import it in the page where you want to use it
3. Add the component to the JSX
4. Style using Tailwind CSS classes
5. Save and test

### Best Practices

- **Always test changes** - Test locally before deploying
- **Use consistent styling** - Use existing Tailwind classes and CSS variables
- **Keep components reusable** - Create components that can be used in multiple places
- **Document changes** - Update this guide if you make significant changes
- **Version control** - Use Git to track changes

---

## Deployment

### Deploying to Manus

1. **Push to Git Repository**
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. **Manus Deployment**
   - The project is hosted on Manus
   - Changes are automatically deployed when you push to the main branch
   - Check the deployment status in your Manus dashboard

### Environment Variables

Make sure to set the following environment variables in your Manus deployment:

- `DATABASE_URL` - MySQL database connection string
- `PAYMOB_API_KEY` - Paymob API key
- `PAYMOB_MERCHANT_ID` - Paymob merchant ID
- `JWT_SECRET` - Secret key for JWT tokens
- `SMTP_HOST` - Email server host
- `SMTP_USER` - Email server username
- `SMTP_PASS` - Email server password

### Monitoring Deployments

1. Log in to your Manus dashboard
2. Navigate to the project
3. Check the deployment status
4. View logs for any errors
5. Rollback if necessary

---

## Troubleshooting

### Common Issues and Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Page not loading | Routing error | Check App.tsx routes and file paths |
| Styling looks wrong | CSS variables not loaded | Clear cache and refresh browser |
| Database errors | Connection issue | Check DATABASE_URL environment variable |
| Payment not working | Paymob credentials missing | Verify PAYMOB_API_KEY and PAYMOB_MERCHANT_ID |
| Images not showing | Wrong file path | Use relative paths and check image location |

### Debugging Tips

1. **Check Browser Console** - Look for JavaScript errors
2. **Check Network Tab** - Verify API requests are successful
3. **Check Server Logs** - View logs in Manus dashboard
4. **Test Locally** - Run the project locally to isolate issues
5. **Use Browser DevTools** - Inspect elements and check styles

### Getting Help

- Check the project documentation in **pasted_content.txt**
- Review the code comments in each file
- Check Manus documentation for hosting-related issues
- Contact Manus support if you encounter deployment issues

---

## Summary

**Be Mo Store** is a fully functional marketplace platform. To manage it effectively:

1. **Understand the structure** - Know where each file is and what it does
2. **Make changes carefully** - Test before deploying
3. **Keep documentation updated** - Update this guide as you make changes
4. **Monitor performance** - Check logs and analytics regularly
5. **Plan updates** - Plan changes in advance to avoid downtime

For more information, refer to the project TODO list in **pasted_content.txt** and the code comments in each file.

---

**Last Updated:** November 2025  
**Project Name:** Be Mo store  
**Version:** 1.0.0
