jQuery(window).on('load', function() {   
    
    // HIDE PRELAODER
    $(".preloader").addClass("hide-preloader");
  
});


jQuery(document).ready(function($) {
	"use strict";

	// Build portfolio items from SindyKhumaloWebsite folder
	var sindiImages = [
		"WhatsApp Image 2025-08-29 at 12.04.18_ed54adfe.jpg", // Newspaper article first
		"WhatsApp Image 2025-08-29 at 11.35.02_fe543214.jpg",
		"WhatsApp Image 2025-08-29 at 11.35.03_13548132.jpg",
		"WhatsApp Image 2025-08-29 at 11.35.03_5a346056.jpg",
		"WhatsApp Image 2025-08-29 at 11.35.03_a5e872bf.jpg",
		"WhatsApp Image 2025-08-29 at 11.35.05_418bccb6.jpg",
		"WhatsApp Image 2025-08-29 at 11.35.05_4457b3df.jpg",
		"WhatsApp Image 2025-08-29 at 11.35.05_c11ca65e.jpg",
		"WhatsApp Image 2025-08-29 at 11.35.06_e36c8801.jpg",
		"WhatsApp Image 2025-08-29 at 11.35.08_48dd804b.jpg",
		"WhatsApp Image 2025-08-29 at 11.35.08_6702e791.jpg",
		"WhatsApp Image 2025-08-29 at 11.35.09_2a7d0e55.jpg",
		"WhatsApp Image 2025-08-29 at 11.35.09_76ae3c7e.jpg",
		"WhatsApp Image 2025-08-29 at 11.35.09_ed219536.jpg",
		"WhatsApp Image 2025-08-29 at 11.35.11_2cf2acf5.jpg",
		"WhatsApp Image 2025-08-29 at 11.35.11_952cf543.jpg",
		"WhatsApp Image 2025-08-29 at 11.35.11_aa3350e4.jpg",
		"WhatsApp Image 2025-08-29 at 11.35.12_02d156ba.jpg",
		"WhatsApp Image 2025-08-29 at 11.35.12_0fb92905.jpg",
		"WhatsApp Image 2025-08-29 at 11.35.12_3b30ae74.jpg",
		"WhatsApp Image 2025-08-29 at 11.40.15_44377698.jpg",
		"WhatsApp Image 2025-08-29 at 11.40.52_74aeec84.jpg",
		"WhatsApp Image 2025-08-29 at 11.40.53_5af4c0eb.jpg",
		"WhatsApp Image 2025-08-29 at 11.40.53_7ed0f262.jpg",
		"WhatsApp Image 2025-08-29 at 11.40.55_4bbd4b7a.jpg",
		"WhatsApp Image 2025-08-29 at 11.40.55_4c8745ab.jpg",
		"WhatsApp Image 2025-08-29 at 11.40.56_b1e1811f.jpg",
		"WhatsApp Image 2025-08-29 at 11.40.56_b8006e2c.jpg",
		"WhatsApp Image 2025-08-29 at 11.40.57_874b984f.jpg",
		"WhatsApp Image 2025-08-29 at 11.40.57_e2ebcca8.jpg",
		"WhatsApp Image 2025-08-29 at 11.56.37_8103d88f.jpg",
		"WhatsApp Image 2025-08-29 at 11.56.39_79162586.jpg",
		"WhatsApp Image 2025-08-29 at 11.56.44_cc05287c.jpg",
		"WhatsApp Image 2025-08-29 at 11.57.43_853b336e.jpg",
		"WhatsApp Image 2025-08-29 at 11.57.44_c96b07c4.jpg",
		"WhatsApp Image 2025-08-29 at 11.57.44_d2f54b50.jpg",
		"WhatsApp Image 2025-08-29 at 11.57.48_226cf341.jpg",
		"WhatsApp Image 2025-08-29 at 11.57.49_2378283e.jpg",
		"WhatsApp Image 2025-08-29 at 11.57.50_2b5ad68a.jpg",
		"WhatsApp Image 2025-08-29 at 11.57.50_77ac22dc.jpg",
		"WhatsApp Image 2025-08-29 at 11.57.51_160721c4.jpg",
		"WhatsApp Image 2025-08-29 at 11.57.51_d116016d.jpg",
		"WhatsApp Image 2025-08-29 at 11.57.52_13b076dd.jpg",
		"WhatsApp Image 2025-08-29 at 11.57.52_2cc8036a.jpg",
		"WhatsApp Image 2025-08-29 at 11.57.52_9bd72950.jpg",
		"WhatsApp Image 2025-08-29 at 11.57.53_265a26f9.jpg",
		"WhatsApp Image 2025-08-29 at 11.57.53_34304959.jpg",
		"WhatsApp Image 2025-08-29 at 11.57.53_99f25c60.jpg",
		"WhatsApp Image 2025-08-29 at 11.58.39_fe6657be.jpg",
		"WhatsApp Image 2025-08-29 at 11.58.40_75c005e9.jpg",
		"WhatsApp Image 2025-08-29 at 11.58.40_c5680df8.jpg",
		"WhatsApp Image 2025-08-29 at 11.58.41_4019ce1e.jpg",
		"WhatsApp Image 2025-08-29 at 11.58.41_86774299.jpg",
		"WhatsApp Image 2025-08-29 at 11.58.41_93a87a2c.jpg",
		"WhatsApp Image 2025-08-29 at 11.58.41_983edd57.jpg",
		"WhatsApp Image 2025-08-29 at 11.58.41_cdf491b2.jpg",
		"WhatsApp Image 2025-08-29 at 11.58.41_db82888b.jpg"
	];

	// Only load portfolio on portfolio page
	var $portfolio = $('.portfolio');
	if ($portfolio.length && window.location.pathname.includes('portfolio.html')) {
		$portfolio.empty();
		
		// Add all images to portfolio grid
		$.each(sindiImages, function(index, fileName) {
			var filePath = 'assets/img/SindyKhumaloWebsite/' + fileName;
			var $a = $('<a/>', { 'class': 'item', href: filePath });
			$a.append('<i class="fa fa-eye" aria-hidden="true"></i>');
			var bgStyle = 'background-image: url("' + filePath + '")';
			var $cover = $('<div/>', { 'class': 'item-cover', style: bgStyle });
			$a.append($cover);
			$portfolio.append($a);
		});
        
        // PORTFOLIO GALLERY 
        $('.portfolio a').featherlightGallery({
            previousIcon: '&#9664;',   
            nextIcon: '&#9654;',         
            galleryFadeIn: 100,
            galleryFadeOut: 300    
        });
	}

	// Scroll-reveal animations with IntersectionObserver
	var observerSupported = 'IntersectionObserver' in window;
	var io = null;
	if (observerSupported) {
		io = new IntersectionObserver(function(entries) {
			entries.forEach(function(entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					io.unobserve(entry.target);
				}
			});
		}, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
	}

	function applyScrollReveal($elements, baseDelayMs, stepMs) {
		$elements.each(function(index) {
			var delaySec = ((baseDelayMs + (index * stepMs)) / 1000) + 's';
			this.classList.add('sr');
			this.style.setProperty('--sr-delay', delaySec);
			if (io) {
				io.observe(this);
			} else {
				this.classList.add('is-visible');
			}
		});
	}

	// Hero title
	applyScrollReveal($('.hero .front-content h1'), 100, 0);

	// Portfolio items with stagger (only if portfolio exists)
	if ($portfolio.length && window.location.pathname.includes('portfolio.html')) {
		applyScrollReveal($portfolio.find('.item'), 150, 60);
	}

	// Footer elements
	applyScrollReveal($('.footer .footer-inner'), 200, 0);
	applyScrollReveal($('.footer .social-icons li'), 260, 80);

	// About page elements (if present)
	var $aboutContainer = $('.about .container-fluid');
	if ($aboutContainer.length) {
		applyScrollReveal($aboutContainer.find('img'), 120, 0);
		applyScrollReveal($aboutContainer.find('h3'), 200, 0);
		applyScrollReveal($aboutContainer.find('p'), 260, 80);
		applyScrollReveal($aboutContainer.find('.contact'), 340, 0);
	}

	// Main content elements
	var $mainContent = $('.main-content');
	if ($mainContent.length) {
		applyScrollReveal($mainContent.find('.profile-picture'), 120, 0);
		applyScrollReveal($mainContent.find('.bio-section h3'), 200, 0);
		applyScrollReveal($mainContent.find('.bio-section p'), 260, 80);
		applyScrollReveal($mainContent.find('.articles-section'), 340, 0);
	}

	// Recce preview elements
	var $reccePreview = $('.recce-preview');
	if ($reccePreview.length) {
		applyScrollReveal($reccePreview.find('h3'), 120, 0);
		applyScrollReveal($reccePreview.find('p'), 200, 0);
		applyScrollReveal($reccePreview.find('.recce-item'), 260, 80);
		applyScrollReveal($reccePreview.find('.view-portfolio'), 400, 0);
	}
     
});