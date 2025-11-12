# St. Patrick's Website - Deployment Guide for Syskay Hosting

## 🎯 PRE-DEPLOYMENT CHECKLIST

Before uploading to Syskay, make sure you have completed these tasks:

### ✅ CRITICAL (Must Complete)
- [ ] Create favicon files (see `FAVICON-INSTRUCTIONS.md`)
- [ ] Upload favicon.ico, apple-touch-icon.png, church-og-image.jpg to `images/` folder
- [ ] Change admin password in `admin/manage-announcements.php` (line 10)
- [ ] Verify parish email in `contact-handler.php` (line 10): Info@stpatrickigbogilaipaja.com
- [ ] Test contact form locally if possible

### ⚠️ IMPORTANT (Recommended)
- [ ] Update all social media links when accounts are created
- [ ] Verify mass times are correct in index.html
- [ ] Check all phone numbers and email addresses
- [ ] Test on mobile device before uploading

## 📦 FILES TO UPLOAD

Upload everything in the `new-design/` folder to your Syskay hosting:

```
new-design/
├── admin/
│   └── manage-announcements.php
├── css/
│   ├── modern-variables.css
│   └── modern-components.css
├── data/
│   └── announcements.json
├── images/
│   └── (all image files)
├── js/
│   ├── main.js
│   └── announcements.js
├── *.html (all HTML files)
├── contact-handler.php
├── .htaccess
└── README.md (optional)
```

## 🚀 STEP-BY-STEP DEPLOYMENT TO SYSKAY

### Step 1: Access Your Syskay Hosting Account

1. Log in to your Syskay control panel (cPanel or similar)
2. Look for **File Manager** or **FTP Access**
3. Navigate to your website's root directory (usually `public_html/` or `www/`)

### Step 2: Upload Files

**Option A: Using File Manager (Easier)**
1. Click "Upload" button in File Manager
2. Select all files from `new-design/` folder
3. Wait for upload to complete
4. Verify all folders (admin, css, data, images, js) are present

**Option B: Using FTP (Recommended for Large Uploads)**
1. Download FileZilla (free FTP client): https://filezilla-project.org/
2. Get FTP credentials from Syskay:
   - Host: ftp.yourdomain.com (or IP address)
   - Username: (from Syskay)
   - Password: (from Syskay)
   - Port: 21
3. Connect via FileZilla
4. Drag and drop all files from `new-design/` folder to server

### Step 3: Set File Permissions

**IMPORTANT:** Some files need special permissions:

1. In File Manager, right-click on these items and select "Change Permissions":
   - `data/` folder → 755
   - `data/announcements.json` → 644
   - `admin/` folder → 755
   - `admin/manage-announcements.php` → 644
   - `contact-handler.php` → 644
   - `.htaccess` → 644

2. Make sure PHP can write to the data folder:
   ```
   data/ folder: 755 (rwxr-xr-x)
   announcements.json: 644 (rw-r--r--)
   ```

### Step 4: Configure PHP Mail (For Contact Form)

1. In Syskay cPanel, find **Email Accounts**
2. Create email: `noreply@yourdomain.com` (used for sending)
3. Verify your main parish email `Info@stpatrickigbogilaipaja.com` exists
4. Test email functionality:
   - Go to cPanel → **PHP Mail Test**
   - Send test email to yourself

**If emails don't work:**
- Contact Syskay support and ask them to enable `mail()` function
- Alternative: Ask about SMTP settings and we'll update the code

### Step 5: Test Your Website

1. **Visit your website:**
   - http://yourdomain.com (or stpatrickigbogilaipaja.com)

2. **Test contact form:**
   - Fill out the form
   - Submit
   - Check if email arrives at Info@stpatrickigbogilaipaja.com
   - Check spam folder if not received

3. **Test announcements page:**
   - Visit: http://yourdomain.com/announcement.html
   - Verify announcements load correctly

4. **Test admin panel:**
   - Visit: http://yourdomain.com/admin/manage-announcements.php
   - Login with password you set
   - Try adding a test announcement
   - Check if it appears on the website

5. **Test all pages:**
   - Click through every menu item
   - Verify no broken links
   - Check on mobile device

### Step 6: Enable HTTPS/SSL Certificate

**CRITICAL FOR SECURITY:**

1. In Syskay cPanel, find **SSL/TLS** or **Let's Encrypt**
2. Click "Install SSL Certificate" for your domain
3. Wait 5-10 minutes for activation
4. After SSL is active:
   - Edit `.htaccess` file
   - Uncomment lines 55-57 (Force HTTPS)
   ```apache
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
   ```
5. Save file
6. Test: Visit http://yourdomain.com (should redirect to https://)

### Step 7: Final Checks

- [ ] Website loads at https://yourdomain.com
- [ ] Contact form sends emails
- [ ] Announcements display correctly
- [ ] Admin panel login works
- [ ] Can add/delete announcements
- [ ] All images load
- [ ] Mobile version looks good
- [ ] No console errors (press F12 in browser)

## 🔐 SECURITY CHECKLIST

After deployment:

1. **Change admin password** immediately:
   - Edit `admin/manage-announcements.php`
   - Line 10: `$ADMIN_PASSWORD = "StPatrick2024";`
   - Change to a strong password
   - Re-upload file

2. **Save your passwords securely:**
   - Admin panel password
   - FTP credentials
   - cPanel login
   - Email passwords

3. **Backup regularly:**
   - Download full website backup monthly
   - Store announcements.json separately
   - Keep copy of database if you add one later

## 📝 POST-DEPLOYMENT TASKS

### Immediately After Launch:
1. Test contact form from different devices
2. Ask 2-3 people to visit and report issues
3. Submit to Google Search Console
4. Create Google Business Profile

### First Week:
1. Monitor emails from contact form
2. Add 2-3 new announcements
3. Check website analytics
4. Fix any reported issues

### Ongoing:
1. Update announcements weekly
2. Check for broken links monthly
3. Update photos quarterly
4. Backup website monthly

## 🆘 TROUBLESHOOTING

### Contact Form Not Working:
1. Check spam folder
2. Verify email exists in cPanel
3. Check PHP mail is enabled (contact Syskay)
4. Check contact_submissions.log file on server

### Announcements Not Loading:
1. Check file permissions: `data/` folder must be 755
2. Check announcements.json file exists
3. Press Ctrl+F5 to hard refresh browser
4. Check browser console for errors (F12)

### Admin Panel Not Working:
1. Verify you're using the correct password
2. Check if sessions are enabled (contact Syskay)
3. Try different browser
4. Clear browser cookies

### Images Not Loading:
1. Verify images uploaded to `images/` folder
2. Check image names match HTML (case-sensitive!)
3. Verify file permissions: images should be 644

### Website Slow:
1. Enable GZIP compression (already in .htaccess)
2. Optimize images using tinypng.com
3. Check Syskay server status
4. Consider CDN (Cloudflare free tier)

## 📞 SUPPORT CONTACTS

**Syskay Hosting Support:**
- Check your welcome email for support contact
- Usually: support@syskay.com or via cPanel

**Website Issues:**
- Check browser console (F12) for error messages
- Take screenshot of error
- Note which page has the issue

**For Updates to Website:**
- Edit files locally
- Re-upload changed files via FTP
- Clear browser cache (Ctrl+F5)

## 🎓 HOW TO MANAGE CONTENT (NON-TECHNICAL)

### Adding Announcements:
1. Go to: https://yourdomain.com/admin/manage-announcements.php
2. Login
3. Fill out form
4. Click "Add Announcement"
5. Visit website to verify it appears

### Updating Photos:
1. Resize photos to reasonable size (max 2MB each)
2. Login to Syskay File Manager
3. Upload to `images/` folder
4. Note the filename
5. Contact developer to add to page, OR
6. Edit HTML file directly (advanced)

### Changing Text Content:
**Option 1 (Easy):** Contact developer
**Option 2 (Advanced):**
1. Download HTML file via FTP
2. Edit in Notepad++
3. Re-upload
4. Test on website

## ⚡ PERFORMANCE TIPS

After site is live and working:

1. **Optimize Images:**
   - Use tinypng.com to compress all images
   - Re-upload compressed versions
   - Can reduce page size by 60-70%

2. **Enable Cloudflare (Free):**
   - Sign up at cloudflare.com
   - Add your domain
   - Change nameservers at Syskay
   - Provides: CDN, SSL, DDoS protection, caching

3. **Monitor Speed:**
   - Test at: gtmetrix.com
   - Test at: pagespeed.web.dev
   - Aim for: 2-3 seconds load time

## ✅ DEPLOYMENT COMPLETE!

Once everything is tested and working:
1. Announce website launch to parish
2. Add URL to social media bios (when created)
3. Print URL on bulletin
4. Update Google Business Profile

---

**Need Help?** Keep this guide handy and refer back to it. Most issues can be resolved by:
1. Checking file permissions
2. Clearing browser cache (Ctrl+F5)
3. Checking browser console for errors (F12)
4. Contacting Syskay support if server-related

**GOOD LUCK WITH YOUR LAUNCH! 🎉**
