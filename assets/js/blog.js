// Blog functionality
document.addEventListener('DOMContentLoaded', function() {
    initBlogSearch();
    initCategoryFiltering();
    initLoadMore();
    initNewsletterForm();
});

// Search functionality
function initBlogSearch() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const postsGrid = document.getElementById('posts-grid');
    
    if (!searchInput || !postsGrid) return;
    
    let searchTimeout;
    
    // Search on input with debounce
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(this.value);
        }, 300);
    });
    
    // Search on button click
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
    }
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch(this.value);
        }
    });
    
    function performSearch(query) {
        const posts = postsGrid.querySelectorAll('.post-card');
        const normalizedQuery = query.toLowerCase().trim();
        
        posts.forEach(post => {
            const title = post.querySelector('h2, h3')?.textContent.toLowerCase() || '';
            const content = post.querySelector('p')?.textContent.toLowerCase() || '';
            const tags = Array.from(post.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase()).join(' ');
            const category = post.dataset.category || '';
            
            const searchText = `${title} ${content} ${tags} ${category}`;
            const isMatch = normalizedQuery === '' || searchText.includes(normalizedQuery);
            
            if (isMatch) {
                post.style.display = '';
                post.classList.add('fade-in');
                highlightSearchTerms(post, normalizedQuery);
            } else {
                post.style.display = 'none';
                post.classList.remove('fade-in');
            }
        });
        
        // Update results count
        updateResultsCount(query);
    }
    
    function highlightSearchTerms(post, query) {
        if (!query) return;
        
        const title = post.querySelector('h2 a, h3 a');
        const content = post.querySelector('p');
        
        [title, content].forEach(element => {
            if (element && element.textContent.toLowerCase().includes(query)) {
                const regex = new RegExp(`(${query})`, 'gi');
                element.innerHTML = element.textContent.replace(regex, '<span class="search-highlight">$1</span>');
            }
        });
    }
    
    function updateResultsCount(query) {
        const visiblePosts = postsGrid.querySelectorAll('.post-card:not([style*="display: none"])').length;
        const existingCount = document.querySelector('.search-results-count');
        
        if (existingCount) {
            existingCount.remove();
        }
        
        if (query) {
            const countElement = document.createElement('div');
            countElement.className = 'search-results-count';
            countElement.style.cssText = `
                text-align: center;
                margin: 2rem 0;
                color: var(--text-secondary);
                font-style: italic;
            `;
            countElement.textContent = `Found ${visiblePosts} article${visiblePosts !== 1 ? 's' : ''} for "${query}"`;
            
            postsGrid.parentNode.insertBefore(countElement, postsGrid);
        }
    }
}

// Category filtering
function initCategoryFiltering() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const postsGrid = document.getElementById('posts-grid');
    
    if (!categoryButtons.length || !postsGrid) return;
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter posts
            filterPostsByCategory(category);
            
            // Clear search
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.value = '';
            }
            
            // Remove search results count
            const searchCount = document.querySelector('.search-results-count');
            if (searchCount) {
                searchCount.remove();
            }
        });
    });
    
    function filterPostsByCategory(category) {
        const posts = postsGrid.querySelectorAll('.post-card');
        
        posts.forEach(post => {
            const postCategory = post.dataset.category;
            const shouldShow = category === 'all' || postCategory === category;
            
            if (shouldShow) {
                post.style.display = '';
                post.classList.add('fade-in');
                // Remove search highlights
                removeSearchHighlights(post);
            } else {
                post.style.display = 'none';
                post.classList.remove('fade-in');
            }
        });
    }
    
    function removeSearchHighlights(post) {
        const highlights = post.querySelectorAll('.search-highlight');
        highlights.forEach(highlight => {
            highlight.outerHTML = highlight.textContent;
        });
    }
}

// Load more functionality
function initLoadMore() {
    const loadMoreBtn = document.getElementById('load-more');
    
    if (!loadMoreBtn) return;
    
    let currentPage = 1;
    const postsPerPage = 6;
    
    loadMoreBtn.addEventListener('click', function() {
        const button = this;
        const originalText = button.textContent;
        
        // Show loading state
        button.innerHTML = '<span class="loading-spinner"></span> Loading...';
        button.disabled = true;
        
        // Simulate loading delay
        setTimeout(() => {
            loadMorePosts();
            
            // Reset button
            button.textContent = originalText;
            button.disabled = false;
            
            currentPage++;
            
            // Hide button if no more posts (simulation)
            if (currentPage >= 3) {
                button.style.display = 'none';
                
                // Show end message
                const endMessage = document.createElement('p');
                endMessage.textContent = 'You\'ve reached the end of the articles!';
                endMessage.style.cssText = `
                    text-align: center;
                    color: var(--text-secondary);
                    font-style: italic;
                    margin-top: 2rem;
                `;
                button.parentNode.appendChild(endMessage);
            }
        }, 1500);
    });
    
    function loadMorePosts() {
        // In a real implementation, this would fetch more posts from an API
        // For demo purposes, we'll duplicate some existing posts
        const postsGrid = document.getElementById('posts-grid');
        const existingPosts = postsGrid.querySelectorAll('.post-card:not(.featured)');
        
        // Create mock additional posts
        const mockPosts = [
            {
                title: 'JavaScript Performance Optimization',
                category: 'web-development',
                date: 'September 20, 2025',
                readTime: '9 min read',
                description: 'Learn advanced techniques to optimize JavaScript performance in your web applications.',
                tags: ['JavaScript', 'Performance', 'Optimization'],
                slug: 'javascript-performance-optimization'
            },
            {
                title: 'Database Design Principles',
                category: 'backend',
                date: 'September 18, 2025',
                readTime: '13 min read',
                description: 'Essential principles for designing efficient and scalable database schemas.',
                tags: ['Database', 'SQL', 'Design'],
                slug: 'database-design-principles'
            },
            {
                title: 'Container Orchestration with Kubernetes',
                category: 'devops',
                date: 'September 15, 2025',
                readTime: '16 min read',
                description: 'A comprehensive guide to managing containerized applications with Kubernetes.',
                tags: ['Kubernetes', 'Docker', 'DevOps'],
                slug: 'kubernetes-orchestration'
            }
        ];
        
        mockPosts.forEach((post, index) => {
            if (currentPage === 2 || index < 2) {
                const postElement = createPostElement(post);
                postsGrid.appendChild(postElement);
                
                // Animate in
                setTimeout(() => {
                    postElement.classList.add('fade-in');
                }, index * 100);
            }
        });
    }
    
    function createPostElement(post) {
        const article = document.createElement('article');
        article.className = 'post-card';
        article.dataset.category = post.category;
        
        article.innerHTML = `
            <div class="post-image">
                <div class="post-placeholder" style="display: flex;">
                    <i class="fas fa-blog"></i>
                </div>
            </div>
            <div class="post-content">
                <div class="post-meta">
                    <span class="post-date">${post.date}</span>
                    <span class="post-category">${post.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                    <span class="post-read-time">${post.readTime}</span>
                </div>
                <h3><a href="${post.slug}.html">${post.title}</a></h3>
                <p>${post.description}</p>
                <div class="post-tags">
                    ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <a href="${post.slug}.html" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        
        return article;
    }
}

// Newsletter form
function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.innerHTML = '<span class="loading-spinner"></span> Subscribing...';
        submitButton.disabled = true;
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            if (window.PortfolioApp && window.PortfolioApp.showNotification) {
                window.PortfolioApp.showNotification('Successfully subscribed to newsletter!', 'success');
            }
            
            // Reset form
            this.reset();
            
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            if (window.PortfolioApp && window.PortfolioApp.showNotification) {
                window.PortfolioApp.showNotification('Failed to subscribe. Please try again.', 'error');
            }
        } finally {
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// Reading progress indicator (for individual blog posts)
function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
        z-index: 1001;
        transition: width 0.3s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        progressBar.style.width = scrolled + '%';
    });
}

// Share functionality
function initSocialSharing() {
    const shareButtons = document.querySelectorAll('[data-share]');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.dataset.share;
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            const text = encodeURIComponent(document.querySelector('meta[name="description"]')?.content || '');
            
            let shareUrl;
            
            switch (platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
                case 'copy':
                    navigator.clipboard.writeText(window.location.href).then(() => {
                        if (window.PortfolioApp && window.PortfolioApp.showNotification) {
                            window.PortfolioApp.showNotification('Link copied to clipboard!', 'success');
                        }
                    });
                    return;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}

// Table of contents generator (for individual blog posts)
function generateTableOfContents() {
    const headings = document.querySelectorAll('article h2, article h3, article h4');
    if (headings.length === 0) return;
    
    const toc = document.createElement('div');
    toc.className = 'table-of-contents';
    toc.innerHTML = '<h3>Table of Contents</h3><ul></ul>';
    
    const tocList = toc.querySelector('ul');
    
    headings.forEach((heading, index) => {
        const id = `heading-${index}`;
        heading.id = id;
        
        const li = document.createElement('li');
        li.className = `toc-${heading.tagName.toLowerCase()}`;
        li.innerHTML = `<a href="#${id}">${heading.textContent}</a>`;
        
        tocList.appendChild(li);
    });
    
    // Insert TOC after the first paragraph or at the beginning of the article
    const article = document.querySelector('article');
    const firstParagraph = article?.querySelector('p');
    
    if (firstParagraph) {
        firstParagraph.parentNode.insertBefore(toc, firstParagraph.nextSibling);
    } else if (article) {
        article.insertBefore(toc, article.firstChild);
    }
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .table-of-contents {
            background: var(--bg-secondary);
            padding: 1.5rem;
            border-radius: var(--border-radius);
            margin: 2rem 0;
            border-left: 4px solid var(--primary-color);
        }
        .table-of-contents h3 {
            margin-bottom: 1rem;
            color: var(--text-primary);
            font-size: 1.1rem;
        }
        .table-of-contents ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .table-of-contents li {
            margin-bottom: 0.5rem;
        }
        .table-of-contents a {
            color: var(--text-secondary);
            text-decoration: none;
            transition: var(--transition);
        }
        .table-of-contents a:hover {
            color: var(--primary-color);
        }
        .toc-h3 {
            margin-left: 1rem;
        }
        .toc-h4 {
            margin-left: 2rem;
        }
    `;
    document.head.appendChild(style);
}

// Initialize additional features based on page type
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a blog post page (has article element)
    if (document.querySelector('article.blog-post')) {
        initReadingProgress();
        initSocialSharing();
        generateTableOfContents();
    }
});

// Export for external use
window.BlogApp = {
    initReadingProgress,
    initSocialSharing,
    generateTableOfContents
};
