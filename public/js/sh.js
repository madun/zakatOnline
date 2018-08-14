var Site = (function () {
    'use strict';
    
    var _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
    
    function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
    
    function noop() {}
    
    
    
    function pipe() {
        for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
            fns[_key] = arguments[_key];
        }
    
        return function (input) {
            return fns.reduce(function (output, fn) {
                return fn(output);
            }, input);
        };
    }
    
    
    
    
    
    
    
    function each(cb) {
        return function (arr) {
            arr.forEach(cb);
            return arr;
        };
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    function queryAll(context) {
        return function (selector) {
            return [].concat(_toConsumableArray(context.querySelectorAll(selector)));
        };
    }
    
    
    
    
    
    
    
    
    
    
    
    function exist(selector) {
        return new Promise(function (resolve, reject) {
            var elems = queryAll(document)(selector);
    
            if (elems.length) resolve(elems);
            reject('no element found for ' + selector);
        });
    }
    
    function createSlider($el) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    
        var defaults = {
            accessibility: false,
            draggable: false
        };
    
        return new Promise(function (resolve, reject) {
            $el.on('init', function () {
                resolve($el);
            });
    
            $el.slick(_extends$1({}, defaults, opts));
        });
    }
    
    function createPopup($el, $target, $close) {
    
        return new Promise(function (resolve, reject) {
            $el.on('click', function (event) {
                event.preventDefault();
                /* Act on the event */
                $target.addClass('is-active');
            });
    
            $close.on('click', function (event) {
                event.preventDefault();
                /* Act on the event */
                $target.removeClass('is-active');
            });
        });
    }
    
    function zakatPopup() {
    
        return new Promise(function (resolve, reject) {
            var el = document.querySelectorAll(".mask-js");
    
            $('.popup-open-zakat-js').on('click', function (event) {
                event.preventDefault();
                /* Act on the event */
                VMasker(el).unMask();
                var total = Number($('.popup-total-zakat-js').val());
                $('.total-zakat-popup-js').html(total.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1.'));
                $('.popup-container-zakat-js').addClass('is-active');
            });
    
            $('.popup-close-js').on('click', function (event) {
                event.preventDefault();
                /* Act on the event */
                $('.popup-container-zakat-js').removeClass('is-active');
            });
        });
    }
    
    function attr(attr) {
        return function (element) {
            return element.getAttribute(attr);
        };
    }
    
    var activeStateMobile = function () {
        document.addEventListener('touchstart', noop, true);
    };
    
    var WPViewportFix = function () {
        var isIEMobile = '-ms-user-select' in document.documentElement.style && navigator.userAgent.match(/IEMobile/);
    
        if (!isIEMobile) return;
    
        var style = document.createElement('style');
        var fix = document.createTextNode('@-ms-viewport{width:auto!important}');
        style.appendChild(fix);
        document.head.appendChild(style);
    };
    
    var objectFitPolyfill = function () {
        objectFitImages();
    };
    
    var formValidation = function () {
        $('[data-validate]').bazeValidate();
    };
    
    var programSlider = function () {
        createSlider($('.programs-slider'), {
            slidesToShow: 3,
            slidesToScroll: 3,
            prevArrow: '<button type="button" class="slick-prev">\n            <span class="fa fa-angle-left"></span>\n        </button>',
            nextArrow: '<button type="button" class="slick-next">\n            <span class="fa fa-angle-right"></span>\n        </button>',
            responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        }).then(noop);
    };
    
    var meterBar = function () {
        pipe(queryAll(document), each(function (meter) {
            var value = attr('data-meter')(meter);
            meter.style.width = value + '%';
        }))('.meter-bar');
    };
    
    var mainHomePageSlider = function () {
        createSlider($('.main-homepage-slider'), {
            prevArrow: $('.main-slider-prev'),
            nextArrow: $('.main-slider-next'),
            autoplay: true
        }).then(noop);
    };
    
    var adaptiveHeader = function () {
        exist('.site-main-home').then(function (res) {
            var $header = $('.adaptive-header');
            var logo = $('.logo-js');
            var logoWhite = $('.logo-white-js');
    
            if ($(window).scrollTop() < 150) {
                $header.addClass('site-header--transparent');
                logo.removeClass('is-active');
                logoWhite.addClass('is-active');
            } else if ($(window).scrollTop() > 150) {
                $header.removeClass('site-header--transparent');
                logo.addClass('is-active');
                logoWhite.removeClass('is-active');
            }
    
            $(window).on('scroll', function (event) {
                event.preventDefault();
                /* Act on the event */
                if ($(window).scrollTop() < 150) {
                    $header.addClass('site-header--transparent');
                    logo.removeClass('is-active');
                    logoWhite.addClass('is-active');
                } else if ($(window).scrollTop() > 150) {
                    $header.removeClass('site-header--transparent');
                    logo.addClass('is-active');
                    logoWhite.removeClass('is-active');
                }
            });
        }).catch(noop);
    };
    
    var hideAnnouncer = function () {
        exist('.content-announcer-close').then(function (res) {
            var $close = $(res);
    
            $close.on('click', function (event) {
                event.preventDefault();
                /* Act on the event */
                $('.content-announcer').addClass('is-hidden');
            });
        }).catch(noop);
    };
    
    var footerExpand = function () {
        exist('.site-footer-expand-js').then(function (res) {
            var $toggler = $(res);
            var $container = $('.footer-section-expandable');
    
            $toggler.on('click', function (event) {
                event.preventDefault();
                /* Act on the event */
                $toggler.toggleClass('is-active');
                $container.toggleClass('is-active');
            });
        }).catch(noop);
    };
    
    var mobileNav = {
                toggleNav: function toggleNav() {
                            exist('.site-nav-mobile-icon').then(function (res) {
                                        var $nav = $(res);
    
                                        $nav.on('click', function (event) {
                                                    event.preventDefault();
                                                    /* Act on the event */
                                                    $('.site-nav').slideToggle();
                                                    $('.site-nav-child').slideUp();
                                        });
                            }).catch(noop);
                },
                toggleChild: function toggleChild() {
                            exist('.has-child-js').then(function (res) {
                                        var $childNav = $(res);
    
                                        $childNav.on('click', function (event) {
                                                    event.preventDefault();
                                                    /* Act on the event */
                                                    $('.site-nav-child').slideToggle();
                                        });
                            }).catch(noop);
                },
                toggleSubchild: function toggleSubchild() {
                            exist('.has-subchild-js').then(function (res) {
                                        var $childNav = $(res);
    
                                        $childNav.on('click', function (event) {
                                                    event.preventDefault();
                                                    /* Act on the event */
                                                    $(this).parent().find('.site-nav-subchild-list').slideToggle();
                                        });
                            }).catch(noop);
                }
    };
    
    var profileMenu = function () {
        exist('.profile-js').then(function (res) {
            var $toggler = $(res);
            var $container = $('.profile-anchor-js');
    
            $toggler.on('click', function (event) {
                event.preventDefault();
                /* Act on the event */
                $container.toggleClass('is-active');
            });
        }).catch(noop);
    };
    
    var notificationMenu = function () {
        exist('.notification-js').then(function (res) {
            var $toggler = $(res);
            var $container = $('.notification-anchor-js');
    
            $toggler.on('click', function (event) {
                event.preventDefault();
                /* Act on the event */
                $container.toggleClass('is-active');
            });
        }).catch(noop);
    };
    
    var notificationTab = function () {
        exist('.site-nav-notification-tab').then(function (res) {
            var $toggler = $(res);
            var $container = $('.notification-tab-js');
    
            $toggler.on('click', function (event) {
                event.preventDefault();
                /* Act on the event */
                $toggler.removeClass('is-active');
                $container.removeClass('is-active');
    
                var otherElem = $(this).attr('href');
                $(otherElem).addClass('is-active');
                $(this).addClass('is-active');
            });
        }).catch(noop);
    };
    
    var programPhotoSlider = {
        mainPhoto: function mainPhoto() {
            createSlider($('.slick-photo-main'), {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                autoplay: true,
                asNavFor: '.slick-photo-list'
            }).then(noop);
        },
        listPhoto: function listPhoto() {
            createSlider($('.slick-photo-list'), {
                slidesToShow: 6,
                slidesToScroll: 1,
                arrows: false,
                asNavFor: '.slick-photo-main',
                draggable: true,
                infinite: true,
                autoplay: true,
                centerMode: true,
                // accessibility: true,
                focusOnSelect: true
            }).then(noop);
        }
    };
    
    var stickyCard = function () {
        exist('.product-card-js').then(function (res) {
            var container = $(res);
    
            $.fn.isInViewport = function () {
                var elementTop = $(this).offset().top;
                var elementBottom = elementTop + $(this).outerHeight();
                var viewportTop = $(window).scrollTop();
                var viewportBottom = viewportTop + $(window).height();
    
                return elementBottom > viewportTop && elementTop < viewportBottom;
            };
    
            if (container.isInViewport()) {
                $('.product-card--bottom').addClass('is-active');
            } else {
                $('.product-card--bottom').removeClass('is-active');
            }
    
            $(window).on('resize scroll', function () {
                if (container.isInViewport()) {
                    $('.product-card--bottom').addClass('is-active');
                } else {
                    $('.product-card--bottom').removeClass('is-active');
                }
            });
        }).catch(noop);
    };
    
    var contentTab = function () {
        exist('.tab-anchor-js').then(function (res) {
            var $tabAnchor = $(res);
            var $tableContent = $('.tab-content-js');
    
            $tabAnchor.on('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
                /* Act on the event */
                $tabAnchor.removeClass('is-active');
                $tableContent.removeClass('is-active');
    
                var otherElem = $(this).attr('href');
                $(otherElem).addClass('is-active');
                $(this).addClass('is-active');
            });
        }).catch(noop);
    };
    
    var zakatCalculator = {
        calculatorTab: function calculatorTab() {
            exist('.zakat-multitab-tab-anchor').then(function (res) {
                var $tabAnchor = $(res);
                var $tableContent = $("[data-calculator]");
    
                $tabAnchor.on('click', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    /* Act on the event */
                    $tabAnchor.removeClass('is-active');
                    $tableContent.removeClass('is-active');
    
                    var otherElem = $(this).attr('href');
                    $("[data-calculator=" + otherElem + "]").addClass('is-active');
                    $(this).addClass('is-active');
                });
            }).catch(noop);
        },
        zakatTabungan: function zakatTabungan() {
            var valTabungan = null;
            var valHasil = null;
            var totalTabungan = null;
            var totalNishab = null;
            var valRange = 1;
    
            var el = document.querySelectorAll(".mask-js");
            var $home = $('.zakat-tabungan-submit-js');
            var batasNishab = $('.nishab-js').data('nishab');
    
            function tabunganFormula() {
                totalTabungan = 2.5 / 100 * (valTabungan + valHasil);
                totalTabungan = totalTabungan.toFixed(0);
                if (totalTabungan < 0) {
                    totalTabungan = 0;
                }
                $('.js-ztb').html(VMasker.toMoney(totalTabungan, { precision: 0, zeroCents: false }));
                $('.popup-total-zakat-js').val(VMasker.toMoney(totalTabungan, { precision: 0, zeroCents: false, unit: 'Rp' }));
            }
    
            function tabunganNishabFormula() {
                totalNishab = valTabungan + valHasil;
                if (batasNishab > totalNishab) {
                    $('.nishab-warning-js').removeClass('hidden');
                } else {
                    $('.nishab-warning-js').addClass('hidden');
                }
            }
    
            $("input[name=rangeWaktuTabungan]").on('click', function (event) {
                /* Act on the event */
                valRange = Number($("input[name=rangeWaktuTabungan]:checked").val());
                tabunganFormula();
            });
    
            $('.js-saldo-tabungan').on('keyup', function (event) {
                event.preventDefault();
                /* Act on the event */
                valTabungan = Number($(this).val().replace(/[^0-9-,]/g, ''));
                tabunganFormula();
                tabunganNishabFormula();
            });
    
            $('.js-bagi-hasil').on('keyup', function (event) {
                event.preventDefault();
                /* Act on the event */
                valHasil = Number($(this).val().replace(/[^0-9-,]/g, ''));
                tabunganFormula();
                tabunganNishabFormula();
            });
    
            if ($home.length) {
                $home.on('click', function (event) {
                    event.preventDefault();
                    /* Act on the event */
                    $('.popup-container-zakat-js').addClass('is-active');
                    $('.total-zakat-popup-js').html(VMasker.toMoney(totalTabungan, { precision: 0, zeroCents: false }));
                    $('.zakat-type-js').html('Tabungan');
                    $('.home-zakat-form-js').attr('action', $(this).attr('href'));
                });
            }
    
            zakatPopup().then(noop);
        },
        zakatProfesi: function zakatProfesi() {
            var valPenghasilan = null;
            var valLain = null;
            var valHutang = null;
            var totalProfesi = null;
            var totalNishab = null;
            var valRange = 1;
    
            var el = document.querySelectorAll(".mask-js");
            var $home = $('.zakat-profesi-submit-js');
            var batasNishab = $('.nishab-js').data('nishab');
    
            function profesiFormula() {
                totalProfesi = 2.5 / 100 * (valPenghasilan + valLain - valHutang) * valRange;
                totalProfesi = totalProfesi.toFixed(0);
                if (totalProfesi < 0) {
                    totalProfesi = 0;
                }
                $('.js-ztp').html(VMasker.toMoney(totalProfesi, { precision: 0, zeroCents: false }));
                $('.popup-total-zakat-js').val(VMasker.toMoney(totalProfesi, { precision: 0, zeroCents: false, unit: 'Rp' }));
            }
    
            function profesiNishabFormula() {
                totalNishab = valPenghasilan + valLain;
                if (batasNishab > totalNishab) {
                    $('.nishab-warning-js').removeClass('hidden');
                } else {
                    $('.nishab-warning-js').addClass('hidden');
                }
            }
    
            $("input[name=rangeWaktuProfesi]").on('click', function (event) {
                /* Act on the event */
                valRange = Number($("input[name=rangeWaktuProfesi]:checked").val());
                profesiFormula();
            });
    
            $('.js-penghasilan-profesi').on('keyup', function (event) {
                event.preventDefault();
                /* Act on the event */
                valPenghasilan = Number($(this).val().replace(/[^0-9-,]/g, ''));
                profesiFormula();
                profesiNishabFormula();
            });
    
            $('.js-pendapatan-lain-profesi').on('keyup', function (event) {
                event.preventDefault();
                /* Act on the event */
                valLain = Number($(this).val().replace(/[^0-9-,]/g, ''));
                profesiFormula();
                profesiNishabFormula();
            });
    
            $('.js-hutang-profesi').on('keyup', function (event) {
                event.preventDefault();
                /* Act on the event */
                valHutang = Number($(this).val().replace(/[^0-9-,]/g, ''));
                profesiFormula();
            });
    
            if ($home.length) {
                $home.on('click', function (event) {
                    event.preventDefault();
                    /* Act on the event */
                    $('.popup-container-zakat-js').addClass('is-active');
                    $('.total-zakat-popup-js').html(VMasker.toMoney(totalProfesi, { precision: 0, zeroCents: false }));
                    $('.zakat-type-js').html('Profesi');
                    $('.home-zakat-form-js').attr('action', $(this).attr('href'));
                });
            }
    
            zakatPopup().then(noop);
        },
        zakatEmas: function zakatEmas() {
            var valJumlah = null;
            var valHarga = null;
            var totalEmas = null;
            var totalNishab = null;
            var valRange = 1;
    
            var el = document.querySelectorAll(".mask-js");
            var $home = $('.zakat-emas-submit-js');
            var batasNishab = $('.nishab-js').data('nishab');
    
            function profesiFormula() {
                totalEmas = 2.5 / 100 * (valJumlah * valHarga);
                totalEmas = totalEmas.toFixed(0);
                if (totalEmas < 0) {
                    totalEmas = 0;
                }
                $('.js-zte').html(VMasker.toMoney(totalEmas, { precision: 0, zeroCents: false }));
                $('.popup-total-zakat-js').val(VMasker.toMoney(totalEmas, { precision: 0, zeroCents: false, unit: 'Rp' }));
            }
    
            function profesiNishabFormula() {
                totalNishab = valJumlah * valHarga;
                if (batasNishab > totalNishab) {
                    $('.nishab-warning-js').removeClass('hidden');
                } else {
                    $('.nishab-warning-js').addClass('hidden');
                }
            }
    
            $("input[name=rangeWaktuEmas]").on('click', function (event) {
                /* Act on the event */
                valRange = Number($("input[name=rangeWaktuEmas]:checked").val());
                profesiFormula();
            });
    
            $('.js-jumlah-emas').on('keyup', function (event) {
                event.preventDefault();
                /* Act on the event */
                valHarga = Number($('.js-harga-emas').val());
                valJumlah = Number($(this).val().replace(/[^0-9-,]/g, ''));
                profesiFormula();
                profesiNishabFormula();
            });
    
            if ($home.length) {
                $home.on('click', function (event) {
                    event.preventDefault();
                    /* Act on the event */
                    $('.popup-container-zakat-js').addClass('is-active');
                    $('.total-zakat-popup-js').html(VMasker.toMoney(totalEmas, { precision: 0, zeroCents: false }));
                    $('.zakat-type-js').html('Emas');
                    $('.home-zakat-form-js').attr('action', $(this).attr('href'));
                });
            }
    
            zakatPopup().then(noop);
        },
        zakatPerdagangan: function zakatPerdagangan() {
            var valModal = null;
            var valKeuntungan = null;
            var valKerugian = null;
            var valHutang = null;
            var valPiutang = null;
            var totalPerdagangan = null;
            var totalNishab = null;
            var valRange = 1;
    
            var el = document.querySelectorAll(".mask-js");
            var $home = $('.zakat-perdagangan-submit-js');
            var batasNishab = $('.nishab-js').data('nishab');
    
            function perdaganganFormula() {
                totalPerdagangan = 2.5 / 100 * (valModal + valKeuntungan + valPiutang) - (valHutang + valKerugian);
                totalPerdagangan = totalPerdagangan.toFixed(0);
                if (totalPerdagangan < 0) {
                    totalPerdagangan = 0;
                }
                $('.js-ztpe').html(VMasker.toMoney(totalPerdagangan, { precision: 0, zeroCents: false }));
                $('.popup-total-zakat-js').val(VMasker.toMoney(totalPerdagangan, { precision: 0, zeroCents: false, unit: 'Rp' }));
            }
    
            function perdaganganNishabFormula() {
                totalNishab = valModal + valKeuntungan + valPiutang;
                if (batasNishab > totalNishab) {
                    $('.nishab-warning-js').removeClass('hidden');
                } else {
                    $('.nishab-warning-js').addClass('hidden');
                }
            }
    
            $("input[name=rangeWaktuPerdagangan]").on('click', function (event) {
                /* Act on the event */
                valRange = Number($("input[name=rangeWaktuPerdagangan]:checked").val());
                perdaganganFormula();
            });
    
            $('.js-modal-perdagangan').on('keyup', function (event) {
                event.preventDefault();
                /* Act on the event */
                valModal = Number($(this).val().replace(/[^0-9-,]/g, ''));
                perdaganganFormula();
                perdaganganNishabFormula();
            });
    
            $('.js-keuntungan-perdagangan').on('keyup', function (event) {
                event.preventDefault();
                /* Act on the event */
                valKeuntungan = Number($(this).val().replace(/[^0-9-,]/g, ''));
                perdaganganFormula();
                perdaganganNishabFormula();
            });
    
            $('.js-kerugian-perdagangan').on('keyup', function (event) {
                event.preventDefault();
                /* Act on the event */
                valKerugian = Number($(this).val().replace(/[^0-9-,]/g, ''));
                perdaganganFormula();
            });
    
            $('.js-hutang-perdagangan').on('keyup', function (event) {
                event.preventDefault();
                /* Act on the event */
                valHutang = Number($(this).val().replace(/[^0-9-,]/g, ''));
                perdaganganFormula();
            });
    
            $('.js-piutang-perdagangan').on('keyup', function (event) {
                event.preventDefault();
                /* Act on the event */
                valPiutang = Number($(this).val().replace(/[^0-9-,]/g, ''));
                perdaganganFormula();
                perdaganganNishabFormula();
            });
    
            if ($home.length) {
                $home.on('click', function (event) {
                    event.preventDefault();
                    /* Act on the event */
                    $('.popup-container-zakat-js').addClass('is-active');
                    $('.total-zakat-popup-js').html(VMasker.toMoney(totalPerdagangan, { precision: 0, zeroCents: false }));
                    $('.zakat-type-js').html('Perdagangan');
                    $('home-zakat-form-js').attr('action', $(this).attr('href'));
                });
            }
    
            zakatPopup().then(noop);
        },
        fidyah: function fidyah() {
            var valJumlah = null;
            var valHarga = null;
            var totalEmas = null;
            var el = document.querySelectorAll(".mask-js");
    
            function profesiFormula() {
                totalEmas = valJumlah * valHarga;
                $('.js-ztf').html(VMasker.toMoney(totalEmas, { precision: 0, zeroCents: false }));
                $('.popup-total-zakat-js').val(VMasker.toMoney(totalEmas, { precision: 0, zeroCents: false, unit: 'Rp' }));
            }
    
            $('.js-jumlah-fidyah').on('keyup', function (event) {
                event.preventDefault();
                /* Act on the event */
                valHarga = Number($('.js-harga-fidyah').val());
                valJumlah = Number($(this).val());
                profesiFormula();
            });
    
            zakatPopup().then(noop);
        }
    };
    
    var inputRange = function () {
        exist('.input-range-js').then(function (res) {
            $(res).on('input', function (e) {
                var min = e.target.min,
                    max = e.target.max,
                    val = e.target.value;
    
                $(e.target).css({
                    'background-size': (val - min) * 100 / (max - min) + '% 100%'
                });
    
                $('.range-value-js').html(val + '%');
            }).trigger('input');
        }).catch(noop);
    };
    
    var select2Input = {
        select2Default: function select2Default() {
            exist('.select2-js').then(function (res) {
                var option = res;
    
                $(option).select2({
                    width: 'resolve'
                });
            }).catch(noop);
        },
        select2Ajax: function select2Ajax() {
            exist('.select2-ajax-js').then(function (res) {
                res.forEach(function (item) {
                    var url = $(item).attr('data-url');
                    $(item).select2({
                        ajax: {
                            url: url,
                            dataType: 'json',
                            width: 'resolve'
                        }
                    });
                });
            }).catch(noop);
        }
    };
    
    var popupAddress = {
        addressPopup: function addressPopup() {
            createPopup($('.popup-open-js'), $('.popup-address-container-js'), $('.popup-close-js')).then(noop);
        },
        paymentPopup: function paymentPopup() {
            createPopup($('.popup-payment-open-js'), $('.popup-payment-container-js'), $('.popup-close-js')).then(noop);
        },
        programPopup: function programPopup() {
            createPopup($('.popup-program-open-js'), $('.popup-program-container-js'), $('.popup-close-js')).then(noop);
        }
    };
    
    var paymentMethod = function () {
        exist('.payment-method-js').then(function (res) {
            var $radio = $(res);
            var $container = $('.payment-method-container-js');
    
            $radio.on('click', function (event) {
                $container.removeClass('is-active');
                $(this).parents('.form__row').find('.payment-method-container-js').addClass('is-active');
            });
        }).catch(noop);
    };
    
    var expandableWali = function () {
        exist('.expand-wali-js').then(function (res) {
            var $toggler = $(res);
            var $container = $('.wali-container-js');
    
            $toggler.on('click', function (event) {
                event.preventDefault();
                /* Act on the event */
                $container.toggleClass('is-active');
                $(this).toggleClass('is-active');
            });
        }).catch(noop);
    };
    
    var programController = function () {
        var app = angular.module('app', ['angularUtils.directives.dirPagination']);
        app.controller('programController', ['$scope', '$http', function ($scope, $http) {
            var source = $('.donatur-list-js').attr('data-donatur');
    
            if (source != null) {
                var getResultsPage = function getResultsPage(pageNumber) {
                    $scope.loading = true;
                    $http.get(source + pageNumber).then(function (result) {
                        var data = result.data;
                        $scope.dataDonatur = data.data;
                        $scope.totalUsers = data.total;
                        $scope.dataDonatur.map(function (item) {
                            item.donationTotal = VMasker.toMoney(item.donationTotal, { precision: 0, zeroCents: false });
                        });
                        $scope.loading = false;
                    });
                };
    
                $scope.dataDonatur = [];
                $scope.totalUsers = 0;
                $scope.currentPage = 1;
                $scope.limit = 10;
                $scope.loading = false;
                getResultsPage(1);
    
                $scope.pagination = {
                    current: 1
                };
    
                $scope.pageChanged = function (newPage) {
                    getResultsPage(newPage);
                };
            }
        }]);
    };
    
    var datatables = {
        donasiSaya: function donasiSaya() {
            exist('.datatables-js').then(function (res) {
                var $table = $(res);
                var source = $table.attr('data-source');
    
                $table.DataTable({
                    "ajax": source,
                    "scrollX": true,
                    "order": [],
                    "initComplete": function initComplete(settings, json) {
                        $('.dataTables_scrollBody thead tr').css({ visibility: 'collapse' });
                    },
                    "columns": [{ "data": "tanggalDonasi" }, { "data": "judulProgram" }, { "data": "nominal" }, { "data": "status" }, { "data": "campaigner",
                        "render": function render(data, type, row, meta) {
                            return $.map(data, function (item, index) {
                                if (item.status === 'paid') {
                                    return '<div class=""><a href="" class="element-center-block btn-icon-only btn-icon-only--small rating-trigger-js"><span class="fa fa-fw fa-star"></span></a><div class="popup-container popup-rate-container-js"><div class="popup-content-container"> <a href="" class="popup-close popup-close-js">&times;</a><div class="text-center"> <span class="d-block block-half">Rate This Campaigner</span><div class="media-figure media-figure--verified d-iblock block-half"> <img class="circle" src="' + item.image + '" width="60" alt=""></div> <span class="d-block block-half">' + item.nama + '</span><form action="' + item.actionURL + '" class="rate-form-js-' + item.campaignerID + '"><div class="form-star"> <input id="star-1-' + item.campaignerID + '" class="sr-only star-value-js" type="radio" name="star-section-' + item.campaignerID + '" value="5"> <label class="score-icon" for="star-1-' + item.campaignerID + '"></label> <input id="star-2-' + item.campaignerID + '" class="sr-only star-value-js" type="radio" name="star-section-' + item.campaignerID + '" value="4"> <label class="score-icon" for="star-2-' + item.campaignerID + '"></label> <input id="star-3-' + item.campaignerID + '" class="sr-only star-value-js" type="radio" name="star-section-' + item.campaignerID + '" value="3"> <label class="score-icon" for="star-3-' + item.campaignerID + '"></label> <input id="star-4-' + item.campaignerID + '" class="sr-only star-value-js" type="radio" name="star-section-' + item.campaignerID + '" value="2"> <label class="score-icon" for="star-4-' + item.campaignerID + '"></label> <input id="star-5-' + item.campaignerID + '" class="sr-only star-value-js" type="radio" name="star-section-' + item.campaignerID + '" value="1"> <label class="score-icon" for="star-5-' + item.campaignerID + '"></label></div><div class="sr-only"> <input type="text" class="sr-only campaigner-value-js" value="' + item.campaignerID + '" /></div><div class=""> <button type="submit" class="btn btn--primary btn-star-js">Submit</button></div></form></div></div></div></div>';
                                } else if (item.status === 'rated' && item.campaignerRating == 1) {
                                    return '<div class=""> <a href="" class="element-center-block btn-icon-only btn-icon-only--active btn-icon-only--small rating-trigger-js"> <span class="fa fa-fw fa-star"></span> </a><div class="popup-container popup-rate-container-js"><div class="popup-content-container"> <a href="" class="popup-close popup-close-js">&times;</a><div class="text-center"> <span class="d-block block-half">You Already Rate This Campaigner</span><div class="media-figure media-figure--verified d-iblock block-half"> <img class="circle" src="' + item.image + '" width="60" alt=""></div> <span class="d-block block-half">' + item.nama + '</span><form disabled action="' + item.actionURL + '" class="rate-form-js-' + item.campaignerID + ' rate-form-js-disabled"><div class="form-star"> <input id="star-1-' + item.campaignerID + '" class="sr-only star-value-js" type="radio" name="star-section-' + item.campaignerID + '" value="5"> <label class="score-icon" for="star-1-' + item.campaignerID + '"></label> <input id="star-2-' + item.campaignerID + '" class="sr-only star-value-js" type="radio" name="star-section-' + item.campaignerID + '" value="4"> <label class="score-icon" for="star-2-' + item.campaignerID + '"></label> <input id="star-3-' + item.campaignerID + '" class="sr-only star-value-js" type="radio" name="star-section-' + item.campaignerID + '" value="3"> <label class="score-icon" for="star-3-' + item.campaignerID + '"></label> <input id="star-4-' + item.campaignerID + '" class="sr-only star-value-js" type="radio" name="star-section-' + item.campaignerID + '" value="2"> <label class="score-icon" for="star-4-' + item.campaignerID + '"></label> <input id="star-5-' + item.campaignerID + '" class="sr-only star-value-js" type="radio" name="star-section-' + item.campaignerID + '" value="1" checked> <label class="score-icon" for="star-5-' + item.campaignerID + '"></label></div></form></div></div></div></div>';
                                } else if (item.status === 'rated' && item.campaignerRating == 2) {
                                    return '<div class=""> <a href="" class="element-center-block btn-icon-only btn-icon-only--active btn-icon-only--small rating-trigger-js"> <span class="fa fa-fw fa-star"></span> </a><div class="popup-container popup-rate-container-js"><div class="popup-content-container"> <a href="" class="popup-close popup-close-js">&times;</a><div class="text-center"> <span class="d-block block-half">You Already Rate This Campaigner</span><div class="media-figure media-figure--verified d-iblock block-half"> <img class="circle" src="' + item.image + '" width="60" alt=""></div> <span class="d-block block-half">' + item.nama + '</span><form disabled action="' + item.actionURL + '" class="rate-form-js-' + item.campaignerID + ' rate-form-js-disabled"><div class="form-star"> <input id="star-1-' + item.campaignerID + '" class="sr-only star-value-js" type="radio" name="star-section-' + item.campaignerID + '" value="5"> <label class="score-icon" for="star-1-' + item.campaignerID + '"></label> <input id="star-2-' + item.campaignerID + '" class="sr-only star-value-js" type="radio" name="star-section-' + item.campaignerID + '" value="4"> <label class="score-icon" for="star-2-' + item.campaignerID + '"></label> <input id="star-3-' + item.campaignerID + '" class="sr-only star-value-js" type="radio" name="star-section-' + item.campaignerID + '" value="3"> <label class="score-icon" for="star-3-' + item.campaignerID + '"></label> <input id="star-4-' + item.campaignerID + '" class="sr-only star-value-js" type="radio" name="star-section-' + item.campaignerID + '" value="2" checked> <label class="score-icon" for="star-4-' + item.campaignerID + '"></label> <input id="star-5-' + item.campaignerID + '" class="sr-only star-value-js" type="radio" name="star-section-' + item.campaignerID + '" value="1"> <label class="score-icon" for="star-5-' + item.campaignerID + '"></label></div></form></div></div></div></div>';
                                } else if (item.status === 'rated' && item.campaignerRating == 3) {
                                    return '<div class=""> <a href="" class="element-center-block btn-icon-only btn-icon-only--active btn-icon-only--small rating-trigger-js"> <span class="fa fa-fw fa-star"></span> </a><div class="popup-container popup-rate-container-js"><div class="popup-content-container"> <a href="" class="popup-close popup-close-js">&times;</a><div class="text-center"> <span class="d-block block-half">You Already Rate This Campaigner</span><div class="media-figure media-figure--verified d-iblock block-half"> <img class="circle" src="' + item.image + '" width="60" alt=""></div> <span class="d-block block-half">' + item.nama + '</span><form disabled action="' + item.actionURL + '" class="rate-form-js-' + item.campaignerID + ' rate-form-js-disabled"><div class="form-star"> <input id="star-1-' + item.campaignerID + '" class="sr-only star-value-js" type="radio" name="star-section-' + item.campaignerID + '" value="5"> <label class="score-icon" for="star-1-' + item.campaignerID + '"></label> <input id="star-2-' + item.campaignerID + '" class="sr-only star-value-js" type="radio" name="star-section-' + item.campaignerID + '" value="4"> <label class="score-icon" for="star-2-' + item.campaignerID + '"></label> <input id="star-3-' + item.campaignerID + '" class="sr-only star-value-js" type="radio" name="star-section-' + item.campaignerID + '" value="3" checked> <label class="score-icon" for="star-3-' + item.campaignerID + '"></label> <input id="star-4-' + item.campaignerID + '" class="sr-only star-value-js" type="radio" name="star-section-' + item.campaignerID + '" value="2"> <label class="score-icon" for="star-4-' + item.campaignerID + '"></label> <input id="star-5-' + item.campaignerID + '" class="sr-only star-value-js" type="radio" name="star-section-' + item.campaignerID + '" value="1"> <label class="score-icon" for="star-5-' + item.campaignerID + '"></label></div></form></div></div></div></div>';
                                } else if (item.status === 'rated' && item.campaignerRating == 4) {
                                    return '<div class=""> <a href="" class="element-center-block btn-icon-only btn-icon-only--active btn-icon-only--small rating-trigger-js"> <span class="fa fa-fw fa-star"></span> </a><div class="popup-container popup-rate-container-js"><div class="popup-content-container"> <a href="" class="popup-close popup-close-js">&times;</a><div class="text-center"> <span class="d-block block-half">You Already Rate This Campaigner</span><div class="media-figure media-figure--verified d-iblock block-half"> <img class="circle" src="' + item.image + '" width="60" alt=""></div> <span class="d-block block-half">' + item.nama + '</span><form disabled action="' + item.actionURL + '" class="rate-form-js-' + item.campaignerID + ' rate-form-js-disabled"><div class="form-star"> <input id="star-1-' + item.campaignerID + '" class="sr-only star-value-js" type="radio" name="star-section-' + item.campaignerID + '" value="5"> <label class="score-icon" for="star-1-' + item.campaignerID + '"></label> <input id="star-2-' + item.campaignerID + '" class="sr-only star-value-js" type="radio" name="star-section-' + item.campaignerID + '" value="4" checked> <label class="score-icon" for="star-2-' + item.campaignerID + '"></label> <input id="star-3-' + item.campaignerID + '" class="sr-only star-value-js" type="radio" name="star-section-' + item.campaignerID + '" value="3"> <label class="score-icon" for="star-3-' + item.campaignerID + '"></label> <input id="star-4-' + item.campaignerID + '" class="sr-only star-value-js" type="radio" name="star-section-' + item.campaignerID + '" value="2"> <label class="score-icon" for="star-4-' + item.campaignerID + '"></label> <input id="star-5-' + item.campaignerID + '" class="sr-only star-value-js" type="radio" name="star-section-' + item.campaignerID + '" value="1"> <label class="score-icon" for="star-5-' + item.campaignerID + '"></label></div></form></div></div></div></div>';
                                } else if (item.status === 'rated' && item.campaignerRating == 5) {
                                    return '<div class=""> <a href="" class="element-center-block btn-icon-only btn-icon-only--active btn-icon-only--small rating-trigger-js"> <span class="fa fa-fw fa-star"></span> </a><div class="popup-container popup-rate-container-js"><div class="popup-content-container"> <a href="" class="popup-close popup-close-js">&times;</a><div class="text-center"> <span class="d-block block-half">You Already Rate This Campaigner</span><div class="media-figure media-figure--verified d-iblock block-half"> <img class="circle" src="' + item.image + '" width="60" alt=""></div> <span class="d-block block-half">' + item.nama + '</span><form disabled action="' + item.actionURL + '" class="rate-form-js-' + item.campaignerID + ' rate-form-js-disabled"><div class="form-star"> <input id="star-1-' + item.campaignerID + '" class="sr-only star-value-js" type="radio" name="star-section-' + item.campaignerID + '" value="5" checked> <label class="score-icon" for="star-1-' + item.campaignerID + '"></label> <input id="star-2-' + item.campaignerID + '" class="sr-only star-value-js" type="radio" name="star-section-' + item.campaignerID + '" value="4"> <label class="score-icon" for="star-2-' + item.campaignerID + '"></label> <input id="star-3-' + item.campaignerID + '" class="sr-only star-value-js" type="radio" name="star-section-' + item.campaignerID + '" value="3"> <label class="score-icon" for="star-3-' + item.campaignerID + '"></label> <input id="star-4-' + item.campaignerID + '" class="sr-only star-value-js" type="radio" name="star-section-' + item.campaignerID + '" value="2"> <label class="score-icon" for="star-4-' + item.campaignerID + '"></label> <input id="star-5-' + item.campaignerID + '" class="sr-only star-value-js" type="radio" name="star-section-' + item.campaignerID + '" value="1"> <label class="score-icon" for="star-5-' + item.campaignerID + '"></label></div></form></div></div></div></div>';
                                } else if (item.status === 'created') {
                                    return '<div class=""> <a href="' + item.actionURL + '" class="element-center-block btn-icon-only btn-icon-only--small"> <span class="fa fa-fw fa-shopping-cart"></span> </a></div>';
                                } else {
                                    return '';
                                }
                            });
                        }
                    }],
                    "pageLength": 5,
                    "language": {
                        "paginate": {
                            "next": ">",
                            "previous": "<"
                        }
                    },
                    "lengthMenu": [5, 10, 25, 50]
                });
    
                $('.dashboard-content').on('click', '.rating-trigger-js', function (event) {
                    event.preventDefault();
                    /* Act on the event */
                    $(this).parent().find('.popup-rate-container-js').addClass('is-active');
                });
    
                $('.dashboard-content').on('click', '.popup-close-js', function (event) {
                    event.preventDefault();
                    /* Act on the event */
                    $('.popup-rate-container-js').removeClass('is-active');
                });
            }).catch(noop);
        },
        pesanMasuk: function pesanMasuk() {
            exist('.pesan-masuk-datatables-js').then(function (res) {
                var $table = $(res);
                var source = $table.attr('data-source');
    
                $table.DataTable({
                    "ajax": source,
                    "scrollX": true,
                    "order": [],
                    "initComplete": function initComplete(settings, json) {
                        $('.dataTables_scrollBody thead tr').css({ visibility: 'collapse' });
                    },
                    "columns": [{ "data": "tanggalDonasi" }, { "data": "judulProgram" }, { "data": "perihal" }, { "data": "pengirim" }, { "data": "linkDetail",
                        "render": function render(data, type, row, meta) {
                            return $.map(data, function (item, index) {
                                if (item.is_read == true) {
                                    return '<a href="' + item.linkDetailURL + '" class="element-center-block btn-icon-only btn-icon-only--small"><span class="fa fa-fw fa-envelope-open-o"></span></a>';
                                } else {
                                    return '<a href="' + item.linkDetailURL + '" class="element-center-block btn-icon-only btn-icon-only--small"><span class="fa fa-fw fa-envelope-o"></span></a>';
                                }
                            });
                        }
                    }],
                    "pageLength": 5,
                    "language": {
                        "paginate": {
                            "next": ">",
                            "previous": "<"
                        }
                    },
                    "lengthMenu": [5, 10, 25, 50]
                });
            }).catch(noop);
        },
        donatur: function donatur() {
            exist('.program-donatur-datatables-js').then(function (res) {
                var $table = $(res);
                var source = $table.attr('data-source');
    
                $table.DataTable({
                    "ajax": source,
                    "scrollX": true,
                    "order": [],
                    "initComplete": function initComplete(settings, json) {
                        $('.dataTables_scrollBody thead tr').css({ visibility: 'collapse' });
                    },
                    "columns": [{ "data": "tanggalDonasi" }, { "data": "nominal" }, { "data": "nama" }],
                    "pageLength": 5,
                    "language": {
                        "paginate": {
                            "next": ">",
                            "previous": "<"
                        }
                    },
                    "lengthMenu": [5, 10, 25, 50]
                });
            }).catch(noop);
        },
        fundraiser: function fundraiser() {
            exist('.program-fundraiser-datatables-js').then(function (res) {
                var $table = $(res);
                var source = $table.attr('data-source');
    
                $table.DataTable({
                    "ajax": source,
                    "scrollX": true,
                    "order": [],
                    "initComplete": function initComplete(settings, json) {
                        $('.dataTables_scrollBody thead tr').css({ visibility: 'collapse' });
                    },
                    "columns": [{ "data": "nama" }, { "data": "totalDonatur" }, { "data": "nominal" }],
                    "pageLength": 5,
                    "language": {
                        "paginate": {
                            "next": ">",
                            "previous": "<"
                        }
                    },
                    "lengthMenu": [5, 10, 25, 50]
                });
            }).catch(noop);
        },
        infoTerbaru: function infoTerbaru() {
            exist('.info-terbaru-datatables-js').then(function (res) {
                var $table = $(res);
                var source = $table.attr('data-source');
    
                $table.DataTable({
                    "ajax": source,
                    "scrollX": true,
                    "order": [],
                    "initComplete": function initComplete(settings, json) {
                        $('.dataTables_scrollBody thead tr').css({ visibility: 'collapse' });
                    },
                    "columns": [{ "data": "tanggal" }, { "data": "judulProgram" }, { "data": "status",
                        "render": function render(data, type, row, meta) {
                            return '<span class="status-label status-label--' + data + '">' + data + '</span>';
                        } }, { "data": "url",
                        "render": function render(data, type, row, meta) {
                            return $.map(data, function (item, index) {
                                if (item.url_edit == null || item.url_delete == null) {
                                    return '<div class="no-wrap text-center"><a href="' + item.url_detail + '" class="element-center-block btn-icon-only btn-icon-only--small"><span class="fa fa-fw fa-envelope-open-o"></span></a> </div>';
                                } else {
                                    return '<div class="no-wrap"><a href="' + item.url_detail + '" class="element-center-block btn-icon-only btn-icon-only--small"><span class="fa fa-fw fa-envelope-open-o"></span></a> <a href="' + item.url_edit + '" class="element-center-block btn-icon-only btn-icon-only--small"><span class="fa fa-fw fa-pencil"></span></a> <a href="' + item.url_delete + '" class="element-center-block btn-icon-only btn-icon-only--small is-delete-js"><span class="fa fa-fw fa-times"></span></a></div>';
                                }
                            });
                        } }],
                    "pageLength": 5,
                    "language": {
                        "paginate": {
                            "next": ">",
                            "previous": "<"
                        }
                    },
                    "lengthMenu": [5, 10, 25, 50]
                });
            }).catch(noop);
        },
        pencairanDana: function pencairanDana() {
            exist('.pencairan-dana-datatables-js').then(function (res) {
                var $table = $(res);
                var source = $table.attr('data-source');
    
                $table.DataTable({
                    "ajax": source,
                    "scrollX": true,
                    "order": [],
                    "initComplete": function initComplete(settings, json) {
                        $('.dataTables_scrollBody thead tr').css({ visibility: 'collapse' });
                    },
                    "columns": [{ "data": "tanggalPengajuan" }, { "data": "nominal" }, { "data": "tanggalPencairan" }, { "data": "status",
                        "render": function render(data, type, row, meta) {
                            return '<span class="status-label status-label--' + data + '">' + data + '</span>';
                        } }],
                    "pageLength": 5,
                    "language": {
                        "paginate": {
                            "next": ">",
                            "previous": "<"
                        }
                    },
                    "lengthMenu": [5, 10, 25, 50]
                });
            }).catch(noop);
        }
    };
    
    var datePicker = function () {
        exist('.datepicker-js').then(function (res) {
            var $datePicker = $(res);
    
            $datePicker.flatpickr({
                dateFormat: "d-m-Y"
            });
        }).catch(noop);
    };
    
    var dropzone = function () {
        exist('.dropzone-js').then(function (res) {
            var $dropContainer = $(res);
    
            Dropzone.autoDiscover = false;
    
            $dropContainer.each(function (index, el) {
                var dropUrl = $(el).attr('data-url');
                var token = $(el).attr('data-token');
    
                var myDropzone = new Dropzone(el, {
                    url: dropUrl,
                    headers: {
                        'X-CSRF-Token': token
                    }
                });
    
                myDropzone.on("success", function (file) {
                    console.log(file);
                });
            });
        }).catch(noop);
    };
    
    var rewardGenerate = function () {
        exist('.generate-reward-js').then(function (res) {
            var $generator = $(res);
            var $container = $('.reward-container');
            var $content = $('.reward-item');
            var template = '<div class="reward-item">\n            <a href="" class="reward-close"><span class="fa fa-times"></span></a>\n            <div class="form__row">\n                <label for="" class="form-label">Judul Reward</label>\n                <input type="text" class="form-input" name="title[]" required>\n            </div>\n            <div class="form__row">\n                <label for="" class="form-label">Minimal Donasi</label>\n                <input type="number" class="form-input" name="condition[]" required>\n            </div>\n            <div class="form__row">\n                <label for="" class="form-label">Batas Penerima Reward</label>\n                <input type="number" class="form-input" name="stock_count[]" required>\n            </div>\n            <div class="form__row">\n                <label for="" class="form-label">Deskripsi Singkat</label>\n                <textarea id="" cols="5" rows="5" class="form-input tinymce-js" name="content[]"></textarea>\n            </div>\n            <div class="form__row">\n                <label for="" class="form-label">Foto Reward</label>\n                <input type="file" class="form-input" name="imagearr[]">\n            </div>\n        </div>';
    
            $generator.on('click', function (event) {
                event.preventDefault();
                /* Act on the event */
                $container.append(template);
                tinymce.init({
                    selector: '.tinymce-js',
                    plugins: 'preview searchreplace autolink directionality visualblocks visualchars image link media table charmap hr pagebreak nonbreaking anchor advlist lists textcolor imagetools contextmenu colorpicker textpattern code',
                    toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
                    image_title: true,
                    automatic_uploads: true,
                    skin_url: 'assets/css',
                    file_picker_types: 'image',
    
                    file_picker_callback: function file_picker_callback(cb, value, meta) {
                        var input = document.createElement('input');
                        input.setAttribute('type', 'file');
                        input.setAttribute('accept', 'image/*');
    
                        input.onchange = function () {
                            var file = this.files[0];
    
                            var reader = new FileReader();
                            reader.onload = function () {
                                var id = 'blobid' + new Date().getTime();
                                var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                                var base64 = reader.result.split(',')[1];
                                var blobInfo = blobCache.create(id, file, base64);
                                blobCache.add(blobInfo);
    
                                cb(blobInfo.blobUri(), { title: file.name });
                            };
                            reader.readAsDataURL(file);
                        };
                        input.click();
                    }
                });
            });
    
            $('.reward-container').on('click', '.reward-close', function (event) {
                event.preventDefault();
                /* Act on the event */
                $(this).parent().remove();
            });
        }).catch(noop);
    };
    
    var chart = function () {
        exist('.chart-js').then(function (res) {
            var $chart = $(res);
            var seriesData = [];
            var option = {
                rangeSelector: {
                    enabled: false,
                    inputEnabled: false
                },
    
                credits: {
                    enabled: false
                },
    
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        month: '%b',
                        year: '%b'
                    }
                },
    
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '{point.x:%e. %b}: Rp {point.y:.2f}'
                },
    
                title: {
                    text: null
                },
    
                navigator: {
                    enabled: false
                },
    
                scrollbar: {
                    enabled: false
                },
    
                series: seriesData
            };
    
            $.each($chart, function (index, chart) {
                var dataChart = $(this).attr('data-chart');
    
                $.getJSON(dataChart, function (res, textStatus) {
                    /*optional stuff to do after success */
                    res.map(function (item) {
                        seriesData.push(item);
                        Highcharts.chart(chart, option);
                    });
                });
            });
        }).catch(noop);
    };
    
    var superqurbanCalculator = {
        superqruban: function superqruban() {
            exist('.qurban-total-js').then(function (res) {
                var $qurbanTotal = $(res);
                var $qurbanPrice = $('.qurban-price-js');
                var $qurbanPriceTotal = $('.qurban-price-total-js');
                var total = 0;
                var harga = $qurbanPrice.val();
                var totalHarga = 0;
    
                $('.qurban-minus-js, .qurban-plus-js').on('click', function (event) {
                    event.preventDefault();
                    /* Act on the event */
                    total = $('.qurban-total-js').val();
                    totalHarga = (total * harga).toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1.');
                    $qurbanPriceTotal.val(totalHarga);
                });
    
                $('.qurban-total-js').on('change', function (event) {
                    event.preventDefault();
                    /* Act on the event */
    
                    total = $(this).val();
                    totalHarga = (total * harga).toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1.');
                    $qurbanPriceTotal.val(totalHarga);
                });
    
                $('.qurban-popup-js').on('click', function (event) {
                    event.preventDefault();
                    /* Act on the event */
                    var olahan = $('.olahan-js:checked').attr('data-value');
                    var kirimStatus = $('.kirim-js:checked').attr('data-value');
                    $('.type-popup-js').html(olahan);
                    $('.total-popup-js').html(total);
                    $('.total-price-popup-js').html(totalHarga);
                    $('.status-popup-js').html(kirimStatus);
                    $('.qurban-popup-container-js').addClass('is-active');
                });
    
                $('.popup-close-js').on('click', function (event) {
                    event.preventDefault();
                    /* Act on the event */
                    $('.qurban-popup-container-js').removeClass('is-active');
                });
            }).catch(noop);
        },
        superqurbanCart: function superqurbanCart() {
            exist('.qurban-cart-total-js').then(function (res) {
                var $qurbanTotal = $(res);
                var $qurbanPriceTotal = $('.qurban-price-total-js');
                var total = 0;
                var totalHarga = 0;
    
                $('.qurban-cart-minus-js, .qurban-cart-plus-js').on('click', function (event) {
                    event.preventDefault();
                    /* Act on the event */
                    total = $(this).parent().find('.qurban-cart-total-js').val();
                    var harga = $(this).parents('.qurban-cart-container-js').find('.qurban-cart-price-js').val();
                    totalHarga = (total * harga).toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1.');
                    $(this).parents('.qurban-cart-container-js').find('.qurban-cart-price-total-js').val(totalHarga);
                });
    
                $('.qurban-cart-total-js').on('change', function (event) {
                    event.preventDefault();
                    /* Act on the event */
    
                    total = $(this).val();
                    var harga = $(this).parents('.qurban-cart-container-js').find('.qurban-cart-price-js').val();
                    totalHarga = (total * harga).toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1.');
                    $(this).parents('.qurban-cart-container-js').find('.qurban-cart-price-total-js').val(totalHarga);
                });
    
                $('.popup-close-js').on('click', function (event) {
                    event.preventDefault();
                    /* Act on the event */
                    $('.qurban-popup-container-js').removeClass('is-active');
                });
            }).catch(noop);
        }
    };
    
    var clip = function () {
        exist('.clipboard-js').then(function (res) {
            var $clip = $(res);
    
            new ClipboardJS('.clipboard-js');
        }).catch(noop);
    };
    
    var searchTab = function () {
        exist('.site-nav-search-js').then(function (res) {
            var $toggler = $(res);
            var $container = $('.header-search-container');
            var $close = $('.search-close-js');
    
            $toggler.on('click', function (event) {
                event.preventDefault();
                /* Act on the event */
                $container.addClass('is-active');
            });
    
            $close.on('click', function (event) {
                event.preventDefault();
                /* Act on the event */
                $container.removeClass('is-active');
            });
        }).catch(noop);
    };
    
    var coverGenerate = function () {
        exist('.generate-cover-js').then(function (res) {
            var $generator = $(res);
            var $container = $('.photo-cover-container');
            var $content = $('.photo-cover-item');
            var template = '<div class="block-half flex-center photo-cover-item">\n            <input type="file" class="form-input" name="imagearr[]">\n            <a href="" class="cover-close-js"><i class="fa fa-fw fa-times"></i></a>\n        </div>';
    
            $generator.on('click', function (event) {
                event.preventDefault();
                /* Act on the event */
                $container.append(template);
            });
    
            $('.photo-cover-container').on('click', '.cover-close-js', function (event) {
                event.preventDefault();
                /* Act on the event */
                $(this).parent().remove();
            });
        }).catch(noop);
    };
    
    var tinymce$1 = function () {
                    exist('.tinymce-js').then(function (res) {
    
                                    var url = $(res).data('url');
    
                                    tinymce.init({
                                                    selector: '.tinymce-js',
                                                    plugins: 'preview searchreplace autolink directionality visualblocks visualchars image link media table charmap hr pagebreak nonbreaking anchor advlist lists textcolor imagetools contextmenu colorpicker textpattern code',
                                                    toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
                                                    image_title: true,
                                                    automatic_uploads: true,
                                                    branding: false,
                                                    skin_url: 'assets/css',
                                                    images_upload_url: url,
                                                    relative_urls: false,
                                                    remove_script_host: false,
                                                    image_dimensions: false,
                                                    image_class_list: [{ title: 'Responsive', value: 'img-responsive' }],
                                                    file_picker_types: 'image'
                                    });
                    }).catch(noop);
    };
    
    var faqBox = function () {
        exist('.faq-text').then(function (res) {
            var $faqText = $(res);
    
            $faqText.on('click', function (event) {
                event.preventDefault();
                /* Act on the event */
                $(this).toggleClass('is-active');
                $(this).next().toggleClass('is-active');
            });
        }).catch(noop);
    };
    
    var inputMask = {
        maskMoney: function maskMoney() {
            exist('.mask-js').then(function (res) {
    
                VMasker(document.querySelectorAll(".mask-js")).maskMoney({
                    precision: 0,
                    delimiter: '.',
                    unit: 'Rp',
                    zeroCents: false
                });
            }).catch(noop);
        },
        maskNumber: function maskNumber() {
            exist('.mask-number-js').then(function (res) {
    
                VMasker(document.querySelectorAll(".mask-number-js")).maskMoney({
                    precision: 0,
                    delimiter: '.',
                    zeroCents: false
                });
            }).catch(noop);
        }
    };
    
    var clamp = {
      clamp2: function clamp2() {
        exist('.clamp-js').then(function (res) {
          $(res).clamp({ clamp: 3 });
        }).catch(noop);
      },
      clampMultiple: function clampMultiple() {
        exist('.clamp-js-8').then(function (res) {
          $(res).clamp({ clamp: 8 });
        }).catch(noop);
      }
    };
    
    var videoPreview = function () {
        exist('.video-url-js').then(function (res) {
            var $input = $(res);
    
            $('.video-url-js').on('keyup', function (event) {
                event.preventDefault();
                /* Act on the event */
                var url = $(this).val();
                var newUrl = url.replace(/watch\?v=/i, 'embed/');
                $('.video-url-container-js').find('iframe').attr('src', newUrl);
                $('.video-url-container-js').addClass('is-active');
    
                if (url.length == 0) {
                    $('.video-url-container-js').removeClass('is-active');
                }
            });
        }).catch(noop);
    };
    
    var waliGenerate = function () {
        exist('.generate-wali-js').then(function (res) {
            var $generator = $(res);
            var $container = $('.generate-wali-container-js');
            var template = '<li class="block-half">\n            <div class="block-half flex-center photo-cover-item">\n                <input type="text" class="form-input form-input--compact" name="wali_names[]">\n                <a href="" class="cover-close-js"><i class="fa fa-fw fa-times"></i></a>\n            </div>\n        </li>';
    
            $generator.on('click', function (event) {
                event.preventDefault();
                /* Act on the event */
                $container.append(template);
            });
    
            $('.generate-wali-container-js').on('click', '.cover-close-js', function (event) {
                event.preventDefault();
                /* Act on the event */
                $(this).parent().parent().remove();
            });
        }).catch(noop);
    };
    
    var programlistController = function () {
        exist('.program-list-controller').then(function (res) {
            var app = angular.module('app', []);
            app.directive('onFinishRender', ['$timeout', function ($timeout) {
                return {
                    restrict: 'A',
                    link: function link(scope, element, attr$$1) {
                        if (scope.$last) {
                            $timeout(function () {
                                scope.$emit(attr$$1.onFinishRender);
                            });
                        }
                    }
                };
            }]);
    
            app.controller('programlistController', ['$scope', '$http', function ($scope, $http) {
    
                var source = $('.program-container-js').attr('data-url');
                $scope.items = [];
                $scope.nextUrl = null;
                $scope.total = null;
                var scrolled = 0;
                $scope.isLoading = true;
    
                $http.get(source).then(function (res) {
                    $scope.data = res.data;
                    $scope.contentData = $scope.data.data;
    
                    if ($scope.data.total) {
                        $scope.nextUrl = $scope.data.next_page_url;
                        $scope.total = $scope.data.total;
    
                        $scope.items = $scope.contentData.map(function (res, i) {
                            $scope.target = res.target;
                            $scope.collected = res.collected;
                            $scope.targetPrecentage = $scope.collected / $scope.target * 100;
                            res._target_precentage = $scope.targetPrecentage;
                            res.collected = VMasker.toMoney(res.collected, { precision: 0, zeroCents: false, unit: 'Rp' });
    
                            var oneDay = 24 * 60 * 60 * 1000;
                            var firstDate = new Date();
                            var secondDate = new Date(res.end_date);
    
                            var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay));
                            res._remaining_days = diffDays;
                            return res;
                        });
                    } else {
                        $scope.nextUrl = null;
                    }
                    $scope.isLoading = false;
                });
    
                function likeStatus($elem) {
                    var $likeEl = $elem.children('.like');
                    if ($likeEl.hasClass('fa-heart-o')) {
                        $likeEl.removeClass('fa-heart-o');
                        $likeEl.addClass('fa-heart');
                    } else if ($likeEl.hasClass('fa-heart')) {
                        $likeEl.removeClass('fa-heart');
                        $likeEl.addClass('fa-heart-o');
                    }
                }
    
                function like($link, $token, $elem) {
                    var $splitLink = $link.split('/');
                    var $slug = $splitLink[$splitLink.length - 1];
                    $.ajaxSetup({
                        type: 'post',
                        url: $link
                    });
    
                    $.ajax({
                        data: { _token: $token },
                        success: function success(response) {
                            if (response.code == 20) {
                                likeStatus($elem);
                                var $changeUrl = '';
                                if ($elem.hasClass('liked')) {
                                    $changeUrl = '/program/like';
                                    $elem.attr('href', $changeUrl + '/' + $slug);
                                    $elem.removeClass('liked');
                                } else {
                                    $changeUrl = '/program/unlike';
                                    $elem.attr('href', $changeUrl + '/' + $slug);
                                    $elem.addClass('liked');
                                }
                            } else {
                                console.log("fail");
                            }
                        }
                    });
                }
    
                $scope.$on('reInitClamp', function () {
                    $('.clamp-js').clamp({ clamp: 3 });
    
                    $('.card-list').addClass('is-active');
    
                    $('.wishlist').click(function (e) {
                        e.preventDefault();
                        var $link = $(this).attr('href');
                        var $token = $(this).data('token');
                        like($link, $token, $(this));
                    });
                });
    
                if ($(window).width() > 960) {
                    $(window).scroll(function (event) {
                        /* Act on the event */
    
                        if ($(document).height() - $(window).height() == $(window).scrollTop() && $scope.nextUrl != null) {
                            scrolled++;
                            if (scrolled == 1) {
                                $scope.isLoading = true;
                                $http.get($scope.nextUrl).then(function (res) {
                                    $scope.data = res.data;
                                    $scope.contentData = $scope.data.data;
    
                                    if ($scope.contentData != undefined || $scope.contentData != null) {
                                        $scope.nextUrl = $scope.data.next_page_url;
                                        $scope.total = $scope.data.total;
                                        $scope.contentData.map(function (res, i) {
                                            $scope.target = res.target;
                                            $scope.collected = res.collected;
                                            $scope.targetPrecentage = $scope.collected / $scope.target * 100;
                                            res._target_precentage = $scope.targetPrecentage;
                                            res.collected = VMasker.toMoney(res.collected, { precision: 0, zeroCents: false, unit: 'Rp' });
    
                                            var oneDay = 24 * 60 * 60 * 1000;
                                            var firstDate = new Date();
                                            var secondDate = new Date(res.end_date);
    
                                            var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay));
                                            res._remaining_days = diffDays;
                                            $scope.items.push(res);
                                        });
                                        setTimeout(function () {
                                            $scope.isLoading = false;
                                        }, 1000);
                                        scrolled = 0;
                                    } else {
                                        $scope.isLoading = false;
                                        $scope.nextUrl = null;
                                        scrolled = 0;
                                    }
                                });
                            }
                        }
                    });
                }
    
                $scope.mobileLoad = function () {
                    $scope.isLoading = true;
                    $http.get($scope.nextUrl).then(function (res) {
                        $scope.data = res.data;
                        $scope.contentData = $scope.data.data;
    
                        if ($scope.contentData != undefined || $scope.contentData != null) {
                            $scope.nextUrl = $scope.data.next_page_url;
                            $scope.total = $scope.data.total;
                            $scope.contentData.map(function (res, i) {
                                $scope.target = res.target;
                                $scope.collected = res.collected;
                                $scope.targetPrecentage = $scope.collected / $scope.target * 100;
                                res._target_precentage = $scope.targetPrecentage;
                                res.collected = VMasker.toMoney(res.collected, { precision: 0, zeroCents: false, unit: 'Rp' });
    
                                var oneDay = 24 * 60 * 60 * 1000;
                                var firstDate = new Date();
                                var secondDate = new Date(res.end_date);
    
                                var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay));
                                res._remaining_days = diffDays;
                                $scope.items.push(res);
                            });
                            $scope.isLoading = false;
                            scrolled = 0;
                        } else {
                            $scope.isLoading = false;
                            $scope.nextUrl = null;
                            scrolled = 0;
                        }
                    });
                };
            }]);
        }).catch(noop);
    };
    
    var editCart = function () {
        exist('.edit-cart-js').then(function (res) {
            var $btn = $(res);
    
            $btn.on('click', function (event) {
                event.preventDefault();
                /* Act on the event */
                var link = $(this).attr('href');
                $(link).addClass('is-active');
            });
    
            $('.popup-close-js').on('click', function (event) {
                event.preventDefault();
                /* Act on the event */
                $('.popup-container').removeClass('is-active');
            });
        }).catch(noop);
    };
    
    var paymentType = function () {
        exist('.payment-type-js').then(function (res) {
            var $anchor = $(res);
    
            $anchor.on('click', function (event) {
                event.preventDefault();
                /* Act on the event */
                $(this).parent().toggleClass('is-active');
            });
        }).catch(noop);
    };
    
    var countdown = function () {
        exist('.countdown-js').then(function (res) {
            var $countdown = $(res);
            var data = $countdown.attr('data-countdown');
    
            $countdown.countdown(data, function (event) {
                $('.countdown-target-js').html(event.strftime('%D Hari %H Jam %M Menit %S Detik'));
            });
        }).catch(noop);
    };
    
    var wishlist = function () {
        exist('.wishlist').then(function (res) {
    
            $('.wishlist').click(function (e) {
                e.preventDefault();
                var $slug = $(this).data('slug');
                var $token = $(this).data('token');
                like($slug, $token, $(this));
            });
    
            function like($slug, $token, $elem) {
                var $link = '';
                if ($elem.hasClass('liked')) {
                    $link = '{{ url("/program/unlike") }}';
                } else {
                    $link = '{{ url("/program/like") }}';
                }
                $link = $link + '/' + $slug;
    
                $.ajaxSetup({
                    type: 'post',
                    url: $link
                });
    
                $.ajax({
                    data: { _token: $token },
                    success: function success(response) {
                        if (response.code == 20) {
                            likeStatus($elem);
                            var $changeUrl = '';
                            if ($elem.hasClass('liked')) {
                                $changeUrl = '{{ url("/program/like/") }}';
                                $elem.attr('href', $changeUrl + '/' + $slug);
                                $elem.removeClass('liked');
                            } else {
                                $changeUrl = '{{ url("/program/unlike/") }}';
                                $elem.attr('href', $changeUrl + '/' + $slug);
                                $elem.addClass('liked');
                            }
                        } else {
                            console.log("failed");
                        }
                    }
                });
            }
    
            function likeStatus($elem) {
                var $likeEl = $elem.children('.like');
                if ($likeEl.hasClass('fa-heart-o')) {
                    $likeEl.removeClass('fa-heart-o');
                    $likeEl.addClass('fa-heart');
                } else if ($likeEl.hasClass('fa-heart')) {
                    $likeEl.removeClass('fa-heart');
                    $likeEl.addClass('fa-heart-o');
                }
            }
        }).catch(noop);
    };
    
    var stickyFilter = function () {
        exist('.sticky-filter-js').then(function (res) {
            var $container = $(res);
    
            var myElement = document.querySelector(".sticky-filter-js");
            var headroom = new Headroom(myElement, {
                "offset": 100,
                "tolerance": {
                    down: 10
                }
            });
            headroom.init();
        }).catch(noop);
    };
    
    var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
    
    var App = _extends({
        activeStateMobile: activeStateMobile,
        WPViewportFix: WPViewportFix,
        objectFitPolyfill: objectFitPolyfill,
        formValidation: formValidation,
        programSlider: programSlider,
        meterBar: meterBar,
        mainHomePageSlider: mainHomePageSlider,
        adaptiveHeader: adaptiveHeader,
        hideAnnouncer: hideAnnouncer,
        footerExpand: footerExpand
    }, mobileNav, {
        profileMenu: profileMenu,
        notificationMenu: notificationMenu,
        notificationTab: notificationTab
    }, programPhotoSlider, {
        stickyCard: stickyCard,
        contentTab: contentTab
    }, zakatCalculator, {
        inputRange: inputRange
    }, select2Input, popupAddress, {
        paymentMethod: paymentMethod,
        expandableWali: expandableWali,
        programController: programController
    }, datatables, {
        datePicker: datePicker,
        dropzone: dropzone,
        rewardGenerate: rewardGenerate,
        chart: chart
    }, superqurbanCalculator, {
        clip: clip,
        searchTab: searchTab,
        coverGenerate: coverGenerate,
        tinymce: tinymce$1,
        faqBox: faqBox
    }, inputMask, clamp, {
        videoPreview: videoPreview,
        waliGenerate: waliGenerate,
        programlistController: programlistController,
        editCart: editCart,
        paymentType: paymentType,
        countdown: countdown,
        wishlist: wishlist,
        stickyFilter: stickyFilter
    });
    
    for (var fn in App) {
        App[fn]();
    }
    
    return App;
    
    }());
    