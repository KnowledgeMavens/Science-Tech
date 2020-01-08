## First choose - how do I want to make my site?  
The two easiest flavors in 2019 are WordPress or Squarespace.  (Wix, IMHO, mixes a challenging feature set at that lower cost point - lots of visual flexibility at the expense of SEO, smart design constraints, and data portability)
The choice comes down to how much control you want over your content long term (data portability).  Squarespace is a good tool to just get your idea out into the world fast with very little effort which will avoid lots of configuration, but it makes it very hard to leave Squarespace when the Squarespace platform no longer serves your needs in the future.  WordPress is a good tool if you want more control and flexibility over your web experience.

## WordPress installation Process using Namecheap and Digital Ocean

1. Purchase a Domain Name.  This can be done through a number of domain registrars.  Remember that your domain name is your permanent address and your property.  While it's a bit more work, it tends to help your cost and control of your site to NOT combine domain name registration with your hosting service.  Most Hosts that also register domain names for you make it fairly difficult to move away from them later.  This matters if you expect your site to have a longer life than 5 years, as that's the rate where web hosting technology goes through a completely new generation.  I like Namecheap, but there's lots of good domain name registrars out there, and even more ethically dubious and upselly ones like GoDaddy, Network Solutions, and Domain.com
1. Create a Digital Ocean Account or Flywheel account.  These are two services that offer one click WordPress setup and hosting, and a barebones DO server will be $5 / month.
1. Set up your Public SSH key if you haven't already.  Digital Ocean manages access to its droplets by SSH key, which you can add to your account which helps setup later.
1. Digital Ocean: Go to Create >> Droplets >> Marketplace >> Click WordPress on 18.04 (Ubuntu 18.04 server).  

> This screen is worth reading, especially the "Getting started after deploy" section, which tells you some of the things that the one-click 
installation is doing under the hood, including configuring your site's MySQL database.  There are a number of passwords set up by this process which
are important for you to save in a password manager for potential troubleshooting down the road.

1. Click "Configure WordPress Droplet".  Change the size of your droplet from the default $40/ month to $5/month.  A fresh WP install and a new project really doesn't need much more CPU and memory than that.  Enable backups if you want for $1 / month which can protect you if something goes wrong.  Choose a data center close to you and your audience, e.g. NYC or San Francisco (potentially Oregon in the future!). I like to turn on monitoring and add my SSH key so that I can access the server from my command line (though that's not required). You'll have a step later to log in via SSH so if you can set this up it'll be helpful.  Set a unique hostname that is memorable, then click "Create" to set up the droplet.
> Your digital ocean droplet is a dedicated server with a dedicated IP Address, which makes it easy to hook up to your domain.


## Connect your site to your domain.
1. In Namecheap, we'll now set the domain to point to digital ocean.
1. in the Domain List click "Manage" next to your domain.
1. Under Nameservers, select Custom DNS.  Set 3 nameservers:  ns1.digitalocean.com, ns2.digitalocean.com, ns3.digitalocean.com. Then click the green check mark to save the changes. This tells every computer on the internet that the owner of this domain wants readers to go to Digital Ocean to find the current version of the site.
1. In digitalocean, go to "Networking".  We'll now set up Digital Ocean's nameservers to point to your server.
1. Under "Enter Domain" type the name of your domain name, then click "Add Domain"
1. You'll need to create two new DNS records:  Hostname: @ directs to your new droplet, then click "Create Record".  Then do the same for the hostname "www".  
1. If you also want to set up email, such as through GSuite, you'd connect your email server using this DNS record.

## Now we wait.
1.  DNS has to propagate across the internet - that is, every networked computer in the world gets gradually updated with your new domain address, which takes a while!  With Nameserver changes, this can take a long time, like 24 hours, but usually it's a fast process of just an hour or two.
1. Make a cup of tea.  Enjoy.

## Configure the server
1. When DNS has propagated, you can then navigate to your new domain.  You'll see Digital Ocean instructions for completing the WordPress setup.
1. SSH into the new droplet using the command ssh root@{Droplet IP Address}.  You may need to reset your root password if you didn't set up an SSH key - look to your email for the initial root password.
1. Wordpress setup continues after you log into the server.  Enter your domain name.
1. It's best practice to enable HTTPS for your site, which you can do for free using LetsEncrypt.  Assuming that DNS propagation is done now, select "y" to enable let's encrypt.
1. Enter your email for renewal and security notices.
1. Agree to the Lets Encrypt Terms of service and answer your preferences about sharing your information with LetsEncrypt
1. Choose which domains will get the certification
1. Choose 2 - Redirect all domains to HTTPS instead of HTTP.

## Configure WordPress
1. Navigate to your domain name.  You should now see the WordPress Setup Menu. 
2. Choose your Language
3. Give Your Site A Title and pick a secure WordPress username and password.  Add this to your password Manager.  NEVER Choose the username "admin".
4. Select whether search engines should start indexing your site - you'd check this if you need to get your content setup.  When you launch, make sure you disable this under Settings >> Reading so that you get the benefits of WP SEO
1. Click "install WordPress"
1. Navigate to Yourdomain.com/wp-login.php to log in.
1. Get the latest updates to Wordpress.  Click the "cycle" update button in the black admin bar at the top to go to the updates page. Click Update Now to Update WordPress Core and update all plugins and themes. You should always keep your WordPress and plugins up to date, and try to only choose plugins that work well together without a lot of upkeep.  There are a LOT of poorly made plugins in the Wordpress ecosystem, so you always want to get good advice or read the reviews before you install.  Try a local WordPress meetup!


## Set up Your Site
1. Pick a theme! Appearance >> Thmes. Try one of the default themes like TwentyNineteen as a starting point as you get your bearings.  Then experiment.  You can find thousands of themes online of varying quality, or even learn how to build your own theme if you have a specific idea in mind.
1. Install some basic plugins to get started, especially these common plugin choices to solve common issues to optimize your site: 

## Recommended Plugins

Add plugins or your own selections under Plugins >> Add New
* Akismet (Anti-spam comments)
* Advanced Custom Fields (easily set up new content types and fields)
* Gravity Forms (Pro Form Builder with lots of integrations, e.g. to Mailchimp or Emma) 
* IThemes Security (Critical to block brute force attacks and other)
* WordFence (an advanced firewall with a community of hackers that provide 24-hour service protecting your site against the latest threats)
* Monster Insights Google Analytics (You should be measuring your traffic - it's free and it can provide insight into how your efforts are doing)
* Classic Editor (If you don't like the new Gutenberg editor, this is the older stable version from v 4)
* Post SMTP (A more secure connection between your website and your email server so that notifications are always delivered)
* Safe redirect Manager (For older sites - create 301 redirects or move content to new addresses in a way that is SEO friendly)
* The SEO Framework or Yoast (the two most powerful SEO engines for WordPress.  Yoast is a bit "selly")
* Safe SVG (if you use SVG images and want to upload them)
* Short Pixel or WP Smush (Optimize your images as you upload them to reduce Page Load Time)
* Autoptimizer (Optimize your Javascript and CSS dependencies to optimize your Page Load Time.  Fairly compatible with most plugins)
* WordPress Total Cache, or ideally a server-level page and database cache utility like Memcached or NGINX fast CGI caching.  Important if you experience a larger amount of traffic like more than 100 users at a time.


##Bonus projects 
It's possible to serve multiple Blogs from the same Droplet if you want, creating your own shared server.  This is a good practice for small experimental blogs, but if your blog and brand starts getting traction, it's best practice to keep it safer on its own dedicated server.

