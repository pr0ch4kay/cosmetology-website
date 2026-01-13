// ===== Types & Interfaces =====
interface Service {
    id: number;
    icon: string;
    title: string;
    description: string;
    features: string[];
    price: string;
}

interface Specialist {
    id: number;
    name: string;
    position: string;
    experience: string;
    skills: string[];
}

interface Testimonial {
    id: number;
    name: string;
    avatar: string;
    rating: number;
    text: string;
    date: string;
    service: string;
}

interface BookingFormData {
    name: string;
    phone: string;
    email: string;
    service: string;
    message: string;
    privacy: boolean;
}

// ===== Application State =====
class CosmetologyApp {
    private currentTestimonialIndex: number = 0;
    private isMenuOpen: boolean = false;
    private services: Service[] = [];
    private specialists: Specialist[] = [];
    private testimonials: Testimonial[] = [];
    private scrollPosition: number = 0;

    constructor() {
        this.init();
    }

    // Initialize the application
    private init(): void {
        this.loadData();
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.updateActiveNavLink();
        this.animateCounter();
        this.setupFormValidation();
    }

    // Load mock data
    private loadData(): void {
        // Services data
        this.services = [
            {
                id: 1,
                icon: 'fas fa-spa',
                title: 'Эстетическая косметология',
                description: 'Современные методы коррекции и омоложения лица',
                features: ['Ботокс', 'Филлеры', 'Биоревитализация', 'Плазмотерапия'],
                price: 'от 8 000 ₽'
            },
            {
                id: 2,
                icon: 'fas fa-microchip',
                title: 'Аппаратная косметология',
                description: 'Высокотехнологичные процедуры без операции',
                features: ['Лазерные процедуры', 'RF-лифтинг', 'Фототерапия', 'Ультразвук'],
                price: 'от 12 000 ₽'
            },
            {
                id: 3,
                icon: 'fas fa-syringe',
                title: 'Инъекционная косметология',
                description: 'Индивидуальные программы омоложения и коррекции',
                features: ['Мезотерапия', 'Биорепарирование', 'Липолитики', 'Нитьевой лифтинг'],
                price: 'от 15 000 ₽'
            },
            {
                id: 4,
                icon: 'fas fa-face-smile',
                title: 'Уходовые процедуры',
                description: 'Профессиональный уход за кожей лица и тела',
                features: ['Чистка лица', 'Пилинги', 'Массаж лица', 'Уходовые маски'],
                price: 'от 5 000 ₽'
            },
            {
                id: 5,
                icon: 'fas fa-heart-pulse',
                title: 'Массаж и СПА',
                description: 'Расслабляющие и лечебные массажные программы',
                features: ['Лимфодренажный', 'Антицеллюлитный', 'Релаксирующий', 'Лечебный'],
                price: 'от 3 000 ₽'
            },
            {
                id: 6,
                icon: 'fas fa-user-md',
                title: 'Консультация специалиста',
                description: 'Персональная консультация и подбор процедур',
                features: ['Диагностика кожи', 'Составление плана', 'Рекомендации', 'Контроль'],
                price: 'бесплатно'
            }
        ];

        // Specialists data
        this.specialists = [
            {
                id: 1,
                name: 'Анна Петрова',
                position: 'Врач-косметолог',
                experience: 'Опыт 12 лет',
                skills: ['Инъекции', 'Лазер', 'Плазмотерапия', 'Диагностика']
            },
            {
                id: 2,
                name: 'Мария Иванова',
                position: 'Дерматовенеролог',
                experience: 'Опыт 8 лет',
                skills: ['Лечение акне', 'Пилинги', 'Биоревитализация', 'Мезотерапия']
            },
            {
                id: 3,
                name: 'Елена Сидорова',
                position: 'Массажист-реабилитолог',
                experience: 'Опыт 15 лет',
                skills: ['Лимфодренаж', 'Антицеллюлитный массаж', 'Релаксация', 'Коррекция фигуры']
            },
            {
                id: 4,
                name: 'Ольга Николаева',
                position: 'Эстетист',
                experience: 'Опыт 6 лет',
                skills: ['Чистка лица', 'Уходовые процедуры', 'Аппаратный уход', 'Депиляция']
            }
        ];

        // Testimonials data
        this.testimonials = [
            {
                id: 1,
                name: 'Анна К.',
                avatar: 'АК',
                rating: 5,
                text: 'Результат превзошел все ожидания! Кожа стала сияющей, морщины заметно уменьшились. Спасибо специалистам за профессиональный подход.',
                date: '15.12.2023',
                service: 'Курс процедур по омоложению'
            },
            {
                id: 2,
                name: 'Мария И.',
                avatar: 'МИ',
                rating: 5,
                text: 'Очень деликатная работа, естественный результат. Чувствую себя помолодевшей на 10 лет! Процедуры безболезненные и эффективные.',
                date: '03.11.2023',
                service: 'Контурная пластика'
            },
            {
                id: 3,
                name: 'Елена С.',
                avatar: 'ЕС',
                rating: 5,
                text: 'После многолетней борьбы с проблемной кожей наконец-то нашла решение. Кожа чистая и ухоженная. Спасибо за профессионализм!',
                date: '22.10.2023',
                service: 'Лечение акне'
            },
            {
                id: 4,
                name: 'Ольга Н.',
                avatar: 'ОН',
                rating: 5,
                text: 'Отличный сервис, внимательные врачи, современное оборудование. Результат виден после первой процедуры. Рекомендую всем!',
                date: '10.09.2023',
                service: 'RF-лифтинг'
            }
        ];

        this.renderServices();
        this.renderSpecialists();
        this.renderTestimonials();
    }

    // Render services to the DOM
    private renderServices(): void {
        const servicesGrid = document.getElementById('servicesGrid');
        if (!servicesGrid) return;

        servicesGrid.innerHTML = this.services.map(service => `
            <div class="service-card fade-in">
                <div class="service-icon">
                    <i class="${service.icon}"></i>
                </div>
                <h3 class="service-title">${service.title}</h3>
                <p class="service-description">${service.description}</p>
                <ul class="service-features">
                    ${service.features.map(feature => `
                        <li>
                            <i class="fas fa-check"></i>
                            <span>${feature}</span>
                        </li>
                    `).join('')}
                </ul>
                <div class="service-price">${service.price}</div>
                <button class="btn-secondary book-service-btn" data-service="${service.id}">
                    <span>Записаться</span>
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `).join('');
    }

    // Render specialists to the DOM
    private renderSpecialists(): void {
        const specialistsGrid = document.getElementById('specialistsGrid');
        if (!specialistsGrid) return;

        specialistsGrid.innerHTML = this.specialists.map(specialist => `
            <div class="specialist-card slide-up">
                <div class="specialist-image"></div>
                <div class="specialist-info">
                    <h3 class="specialist-name">${specialist.name}</h3>
                    <span class="specialist-position">${specialist.position}</span>
                    <div class="specialist-experience">
                        <i class="fas fa-briefcase"></i>
                        <span>${specialist.experience}</span>
                    </div>
                    <div class="specialist-skills">
                        ${specialist.skills.map(skill => `
                            <span class="skill-tag">${skill}</span>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Render testimonials to the DOM
    private renderTestimonials(): void {
        const testimonialsTrack = document.getElementById('testimonialsTrack');
        const sliderDots = document.getElementById('sliderDots');
        
        if (!testimonialsTrack || !sliderDots) return;

        testimonialsTrack.innerHTML = this.testimonials.map(testimonial => `
            <div class="testimonial-card">
                <div class="testimonial-text">
                    ${testimonial.text}
                </div>
                <div class="client-info">
                    <div class="client-avatar">
                        ${testimonial.avatar}
                    </div>
                    <div class="client-details">
                        <h4>${testimonial.name}</h4>
                        <p>${testimonial.service}</p>
                        <div class="rating">
                            ${Array(testimonial.rating).fill(0).map(() => `
                                <i class="fas fa-star"></i>
                            `).join('')}
                        </div>
                        <span class="testimonial-date">${testimonial.date}</span>
                    </div>
                </div>
            </div>
        `).join('');

        sliderDots.innerHTML = this.testimonials.map((_, index) => `
            <button class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></button>
        `).join('');
    }

    // Setup event listeners
    private setupEventListeners(): void {
        // Navigation
        document.getElementById('menuToggle')?.addEventListener('click', () => this.toggleMenu());
        document.getElementById('backToTop')?.addEventListener('click', () => this.scrollToTop());
        document.getElementById('servicesBtn')?.addEventListener('click', () => this.scrollToSection('services'));
        document.getElementById('aboutBtn')?.addEventListener('click', () => this.scrollToSection('about'));
        document.getElementById('consultBtn')?.addEventListener('click', () => this.openBookingModal());

        // Testimonial slider
        document.getElementById('prevBtn')?.addEventListener('click', () => this.prevTestimonial());
        document.getElementById('nextBtn')?.addEventListener('click', () => this.nextTestimonial());

        // Modal
        document.getElementById('bookBtn')?.addEventListener('click', () => this.openBookingModal());
        document.getElementById('closeModal')?.addEventListener('click', () => this.closeBookingModal());
        document.getElementById('modalPhoneBtn')?.addEventListener('click', () => this.callToBook());
        document.getElementById('modalFormBtn')?.addEventListener('click', () => this.scrollToSection('contact'));

        // Form submission
        document.getElementById('bookingForm')?.addEventListener('submit', (e) => this.handleFormSubmit(e));

        // Service booking buttons
        document.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (target.closest('.book-service-btn')) {
                const button = target.closest('.book-service-btn') as HTMLElement;
                const serviceId = button.getAttribute('data-service');
                this.openBookingModal(serviceId);
            }
        });

        // Dot navigation for testimonials
        document.getElementById('sliderDots')?.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains('dot')) {
                const index = parseInt(target.getAttribute('data-index') || '0');
                this.goToTestimonial(index);
            }
        });

        // Window events
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());
        window.addEventListener('click', (e) => {
            if ((e.target as HTMLElement).classList.contains('modal')) {
                this.closeBookingModal();
            }
        });

        // Nav link clicks
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = (e.target as HTMLElement).getAttribute('href')?.slice(1);
                if (targetId) {
                    this.scrollToSection(targetId);
                    this.toggleMenu(false);
                }
            });
        });
    }

    // Toggle mobile menu
    private toggleMenu(force?: boolean): void {
        this.isMenuOpen = force !== undefined ? force : !this.isMenuOpen;
        const navLinks = document.getElementById('navLinks');
        const menuToggleIcon = document.querySelector('#menuToggle i');

        if (navLinks && menuToggleIcon) {
            navLinks.classList.toggle('active', this.isMenuOpen);
            menuToggleIcon.className = this.isMenuOpen ? 'fas fa-times' : 'fas fa-bars';
            document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
        }
    }

    // Scroll to section
    private scrollToSection(sectionId: string): void {
        const section = document.getElementById(sectionId);
        if (section) {
            const headerHeight = document.querySelector('.header')?.clientHeight || 0;
            const offsetTop = section.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // Scroll to top
    private scrollToTop(): void {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Handle window scroll
    private handleScroll(): void {
        this.scrollPosition = window.scrollY;
        this.updateActiveNavLink();
        this.toggleBackToTopButton();
        this.handleParallax();
    }

    // Update active nav link based on scroll position
    private updateActiveNavLink(): void {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = (section as HTMLElement).offsetTop;
            const sectionHeight = (section as HTMLElement).clientHeight;
            const headerHeight = document.querySelector('.header')?.clientHeight || 0;
            
            if (this.scrollPosition >= sectionTop - headerHeight - 100 &&
                this.scrollPosition < sectionTop + sectionHeight - headerHeight) {
                current = section.getAttribute('id') || '';
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Toggle back to top button visibility
    private toggleBackToTopButton(): void {
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            if (this.scrollPosition > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    }

    // Handle parallax effect
    private handleParallax(): void {
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            const scrolled = this.scrollPosition * 0.5;
            (heroImage as HTMLElement).style.transform = `translateY(${scrolled}px)`;
        }
    }

    // Handle window resize
    private handleResize(): void {
        if (window.innerWidth > 768 && this.isMenuOpen) {
            this.toggleMenu(false);
        }
    }

    // Testimonial slider methods
    private prevTestimonial(): void {
        this.currentTestimonialIndex = (this.currentTestimonialIndex - 1 + this.testimonials.length) % this.testimonials.length;
        this.updateTestimonialSlider();
    }

    private nextTestimonial(): void {
        this.currentTestimonialIndex = (this.currentTestimonialIndex + 1) % this.testimonials.length;
        this.updateTestimonialSlider();
    }

    private goToTestimonial(index: number): void {
        this.currentTestimonialIndex = index;
        this.updateTestimonialSlider();
    }

    private updateTestimonialSlider(): void {
        const track = document.getElementById('testimonialsTrack');
        const dots = document.querySelectorAll('.dot');
        
        if (track) {
            track.style.transform = `translateX(-${this.currentTestimonialIndex * 100}%)`;
        }
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentTestimonialIndex);
        });
    }

    // Animate counter numbers
    private animateCounter(): void {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count') || '0');
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    (counter as HTMLElement).textContent = Math.floor(current).toString();
                    requestAnimationFrame(updateCounter);
                } else {
                    (counter as HTMLElement).textContent = target.toString();
                }
            };
            
            // Start animation when element is in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    }

    // Setup intersection observer for animations
    private setupIntersectionObserver(): void {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all sections and cards
        document.querySelectorAll('section, .service-card, .specialist-card').forEach(el => {
            observer.observe(el);
        });
    }

    // Modal methods
    private openBookingModal(serviceId?: string): void {
        const modal = document.getElementById('bookingModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // If serviceId is provided, pre-select it in the form
            if (serviceId) {
                const serviceSelect = document.getElementById('service') as HTMLSelectElement;
                if (serviceSelect) {
                    serviceSelect.value = serviceId;
                }
            }
        }
    }

    private closeBookingModal(): void {
        const modal = document.getElementById('bookingModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    private callToBook(): void {
        window.location.href = 'tel:+79991234567';
    }

    // Form validation and submission
    private setupFormValidation(): void {
        const form = document.getElementById('bookingForm') as HTMLFormElement;
        if (!form) return;

        const inputs = form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
            'input, select, textarea'
        );

        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }

    private validateField(field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): boolean {
        const value = field.value.trim();
        const fieldName = field.getAttribute('name') || '';
        let isValid = true;
        let errorMessage = '';

        switch (fieldName) {
            case 'name':
                if (!value) {
                    errorMessage = 'Введите ваше имя';
                    isValid = false;
                } else if (value.length < 2) {
                    errorMessage = 'Имя должно содержать минимум 2 символа';
                    isValid = false;
                }
                break;

            case 'phone':
                const phoneRegex = /^[\+]?[7-8]?[0-9\s\-\(\)]{10,15}$/;
                if (!value) {
                    errorMessage = 'Введите номер телефона';
                    isValid = false;
                } else if (!phoneRegex.test(value)) {
                    errorMessage = 'Введите корректный номер телефона';
                    isValid = false;
                }
                break;

            case 'email':
                if (value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        errorMessage = 'Введите корректный email';
                        isValid = false;
                    }
                }
                break;

            case 'service':
                if (!value) {
                    errorMessage = 'Выберите услугу';
                    isValid = false;
                }
                break;

            case 'privacy':
                const checkbox = field as HTMLInputElement;
                if (!checkbox.checked) {
                    errorMessage = 'Необходимо согласие на обработку данных';
                    isValid = false;
                }
                break;
        }

        if (!isValid) {
            this.showError(field, errorMessage);
        } else {
            this.clearError(field);
        }

        return isValid;
    }

    private showError(field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, message: string): void {
        const errorElement = document.getElementById(`${field.name}Error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            field.classList.add('error');
        }
    }

    private clearError(field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): void {
        const errorElement = document.getElementById(`${field.name}Error`);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            field.classList.remove('error');
        }
    }

    private async handleFormSubmit(event: Event): Promise<void> {
        event.preventDefault();
        
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const data: BookingFormData = {
            name: formData.get('name') as string,
            phone: formData.get('phone') as string,
            email: formData.get('email') as string,
            service: formData.get('service') as string,
            message: formData.get('message') as string,
            privacy: formData.get('privacy') === 'on'
        };

        // Validate all fields
        let isValid = true;
        const fields = form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
            'input, select, textarea'
        );

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) return;

        // Disable submit button
        const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement;
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Отправка...</span><i class="fas fa-spinner fa-spin"></i>';
        }

        try {
            // Simulate API call
            await this.simulateApiCall(data);
            
            // Show success message
            this.showSuccessMessage();
            
            // Reset form
            form.reset();
            
            // Close modal if open
            this.closeBookingModal();
            
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.');
        } finally {
            // Re-enable submit button
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span>Отправить заявку</span><i class="fas fa-paper-plane"></i>';
            }
        }
    }

    private simulateApiCall(data: BookingFormData): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form submitted:', data);
                resolve();
            }, 1500);
        });
    }

    private showSuccessMessage(): void {
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.style.display = 'flex';
            
            // Hide after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    }
}

// ===== Initialize Application =====
document.addEventListener('DOMContentLoaded', () => {
    // Check if browser supports Intersection Observer
    if ('IntersectionObserver' in window) {
        new CosmetologyApp();
    } else {
        // Fallback for browsers that don't support Intersection Observer
        console.warn('Intersection Observer not supported');
        const app = new CosmetologyApp();
        
        // Load all animations immediately as fallback
        document.querySelectorAll('.service-card, .specialist-card').forEach(card => {
            card.classList.add('fade-in');
        });
    }
});

// ===== Utility Functions =====
function formatPhoneNumber(phone: string): string {
    return phone.replace(/\D/g, '').replace(/^7/, '+7');
}

function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== Add CSS for spinner =====
const spinnerStyle = document.createElement('style');
spinnerStyle.textContent = `
    .fa-spinner {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .error {
        border-color: #ff4757 !important;
    }
`;
document.head.appendChild(spinnerStyle);