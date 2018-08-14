<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Zakat</title>
    <link rel="stylesheet" href="{{ asset('css/sh.css') }}">
    @section('style')
    @show
</head>
<body>
    <section class="home-section home-section--orange-white">
        <div class="container">
            <h2 class="home-section-heading">Tunaikan Kewajiban</h2>
            <p class="text-center">Kami memfasilitasi Anda untuk mengetahui nilai zakat yang perlu dibayarkan serta memfasilitasi Anda untuk membayarnya secara online. Dengan begitu, berzakat jadi jauh lebih mudah.</p>
            <div class="zakat-multitab-calculator">
                <div class="zakat-multitab-input">
                    <div class="zakat-multitab-tab">
                        <a href="#" id="penghasilan" onclick="tabs('penghasilanForm', this.id, 'penghasilanResult')" class="zakat-multitab-tab-anchor is-active">Zakat Penghasilan</a>
                        <a href="#" id="emas" onclick="tabs('emasForm', this.id, 'emasResult')" class="zakat-multitab-tab-anchor">Zakat Emas &amp; Perak</a>
                        <a href="#" id="perdaganan" onclick="tabs('perdaganganForm', this.id, 'perdaganganResult')" class="zakat-multitab-tab-anchor">Zakat Perdagangan</a>
                        <a href="#" id="tabungan" onclick="tabs('tabunganForm', this.id, 'tabunganResult')" class="zakat-multitab-tab-anchor">Zakat Tabungan</a>
                    </div>
                    <div id="penghasilanForm" class="zakat-multitab-content tab-content-js is-active" data-calculator="profesi">
                        <h3>Perhitungan Zakat Penghasilan</h3>
                        <form action="" class="ng-pristine ng-valid">
                            <div class="block zakat-multitab-content-row">
                                <div class="form-radio-input form-input--inline">
                                    <input type="radio" class="form-input-custom-bullet js-perbulan-tabungan" id="perbulanProfesi" value="1" name="rangeWaktuProfesi" checked="">
                                    <label for="perbulanProfesi">Perbulan</label>
                                </div>
                                <div class="form-radio-input form-input--inline">
                                    <input type="radio" class="form-input-custom-bullet js-pertahun-tabungan" id="pertahunProfesi" value="12" name="rangeWaktuProfesi">
                                    <label for="pertahunProfesi">Pertahun</label>
                                </div>
                            </div>
                            <div class="zakat-multitab-content-row">
                                <div class="block-half input">
                                    <input class="form-input form-input-custom js-penghasilan-profesi" id="valPenghasilanProfesi" onkeyup="toRp('penghasilan')" type="text" placeholder="Penghasilan per Bulan">
                                </div>
                                <div class="block-half input">
                                    <input class="form-input form-input-custom js-pendapatan-lain-profesi" id="valPenghasilanLain" onkeyup="toRp('penghasilan')" type="text" placeholder="Pendapatan lain (Opsional)">
                                </div>
                                <div class="block-half input">
                                    <input class="form-input form-input-custom js-hutang-profesi" id="valPenghasilanHutang" type="text" onkeyup="toRp('penghasilan')" placeholder="Hutang/Cicilan (Opsional)">
                                </div>
                            </div>
                        </form>
                    </div>
                    <div id="emasForm" class="zakat-multitab-content tab-content-js" data-calculator="emas">
                        <h3>Perhitungan Zakat Emas</h3>
                        <form action="" class="ng-pristine ng-valid">
                            <div class="zakat-multitab-content-row">
                                <div class="block-half input">
                                    <input class="form-input form-input-custom js-jumlah-emas mask-number-js" onkeyup="toRp('emas')"  type="text" placeholder="Jumlah Emas (per gram)">
                                </div>
                                <div class="block-half input sr-only">
                                    <input class="form-input form-input-custom js-harga-emas" value="659000"  type="number" placeholder="Harga Emas (per gram)">
                                </div>
                            </div>
                        </form>
                    </div>
                    <div id="perdaganganForm" class="zakat-multitab-content tab-content-js" data-calculator="perdagangan">
                        <h3>Perhitungan Zakat Perdagangan</h3>
                        <form action="" class="ng-pristine ng-valid">
                            <div class="zakat-multitab-content-row">
                                <div class="block-half input">
                                    <input class="form-input form-input-custom js-modal-perdagangan" type="name" placeholder="Modal (1 Tahun)">
                                </div>
                                <div class="block-half input">
                                    <input class="form-input form-input-custom js-keuntungan-perdagangan" type="name" placeholder="Keuntungan (1 Tahun)">
                                </div>
                                <div class="block-half input">
                                    <input class="form-input form-input-custom js-kerugian-perdagangan" type="name" placeholder="Hutang/Kerugian (1 Tahun)">
                                </div>
                                <div class="block-half input">
                                    <input class="form-input form-input-custom js-hutang-perdagangan" type="name" placeholder="Hutang Jatuh Tempo">
                                </div>
                                <div class="block-half input">
                                    <input class="form-input form-input-custom js-piutang-perdagangan" type="name" placeholder="Piutang Dagang">
                                </div>
                            </div>
                        </form>
                    </div>
                    <div id="tabunganForm" class="zakat-multitab-content tab-content-js" data-calculator="tabungan">
                        <h3>Perhitungan Zakat Tabungan</h3>
                        <form action="" class="ng-pristine ng-valid">
                            <div class="zakat-multitab-content-row">
                                <div class="block-half input">
                                    <input class="form-input form-input-custom js-saldo-tabungan" type="number" placeholder="Saldo Tabungan">
                                </div>
                                <div class="block-half input">
                                    <input class="form-input form-input-custom js-bagi-hasil" type="number" placeholder="Bagi Hasil (Opsional)">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="zakat-multitab-result">
                    <div id="penghasilanResult" class="zakat-multitab-result-item is-active" data-calculator="tabungan">
                        <div class="text-center">
                            <div class="zakat-multitab-result-title">
                                <span class="">Total Zakat Penghasilan</span>
                                <span class="zakat-multitab-result-total">IDR <span class="d-iblock js-ztb" id="resultpenghasilan">0</span></span>
                            </div>
                            <div class="zakat-multitab-anchor block-half">
                                <a href="https://sharinghappiness.org/donate/sedekah/zakat-tabungan" class="zakat-tabungan-submit-js submit-zakat">Bayar Zakat</a>
                            </div>
                            <div class="zakat-multitab-note">
                                <small>Note :</small>
                                <ul>
                                    <li><small>Harga beras saat ini</small></li>
                                    <li><small>NISHAB (520 kg beras): </small></li>
                                </ul>
                                <small>*Sumber: BPS</small>
                            </div>
                        </div>
                    </div>
                    <div id="emasResult" class="zakat-multitab-result-item" data-calculator="emas">
                        <div class="text-center">
                            <div class="zakat-multitab-result-title">
                                <span class="">Total Zakat Emas</span>
                                <span class="zakat-multitab-result-total">IDR <span class="d-iblock js-zte" id="resultemas">0</span></span>
                            </div>
                            <div class="zakat-multitab-anchor block-half">
                                <a href="https://sharinghappiness.org/donate/sedekah/zakat-emas" class="zakat-emas-submit-js submit-zakat">Bayar Zakat</a>
                            </div>
                            <div class="zakat-multitab-note">
                                <small>Note :</small>
                                <ul>
                                    <li><small>Harga beras saat ini</small></li>
                                    <li><small>NISHAB (520 kg beras): </small></li>
                                </ul>
                                <small>*Sumber: BPS</small>
                            </div>
                        </div>
                    </div>
                    <div id="perdaganganResult" class="zakat-multitab-result-item" data-calculator="perdagangan">
                        <div class="text-center">
                            <div class="zakat-multitab-result-title">
                                <span class="">Total Zakat Perdagangan</span>
                                <span class="zakat-multitab-result-total">IDR <span class="d-iblock js-ztpe" id="resultperdagangan">0</span></span>
                            </div>
                            <div class="zakat-multitab-anchor block-half">
                                <a href="https://sharinghappiness.org/donate/sedekah/zakat-perdagangan" class="zakat-perdagangan-submit-js submit-zakat">Bayar Zakat</a>
                            </div>
                            <div class="zakat-multitab-note">
                                <small>Note :</small>
                                <ul>
                                    <li><small>Harga beras saat ini</small></li>
                                    <li><small>NISHAB (520 kg beras): </small></li>
                                </ul>
                                <small>*Sumber: BPS</small>
                            </div>
                        </div>
                    </div>
                    <div id="tabunganResult" class="zakat-multitab-result-item" data-calculator="profesi">
                        <div class="text-center">
                            <div class="zakat-multitab-result-title">
                                <span class="">Total Zakat Tabungan</span>
                                <span class="zakat-multitab-result-total">IDR <span class="d-iblock js-ztp" id="resulttabungan">0</span></span>
                            </div>
                            <div class="zakat-multitab-anchor block-half">
                                <a href="https://sharinghappiness.org/donate/sedekah/zakat-penghasilan" class="zakat-profesi-submit-js submit-zakat">Bayar Zakat</a>
                            </div>
                            <div class="zakat-multitab-note">
                                <small>Note :</small>
                                <ul>
                                    <li><small>Harga beras saat ini : Rp. 12.500</small></li>
                                    <li><small>Harga emas saat ini : Rp. 659.000</small></li>
                                    <li><small>NISHAB (520 kg beras): </small></li>
                                </ul>
                                <small>*Sumber: BPS</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
<script src="{{ asset('js/jquery.min.js') }}"></script>
{{-- <script src="{{ asset('js/sh.js') }}"></script> --}}
<script>
    function tabs(form, id, result){
        $('#penghasilanResult').removeClass('is-active');
        $('#emasResult').removeClass('is-active');
        $('#perdaganganResult').removeClass('is-active');
        $('#tabunganResult').removeClass('is-active');

        $('#penghasilanForm').removeClass('is-active');
        $('#emasForm').removeClass('is-active');
        $('#perdaganganForm').removeClass('is-active');
        $('#tabunganForm').removeClass('is-active');

        $('#penghasilan').removeClass('is-active');
        $('#emas').removeClass('is-active');
        $('#perdaganan').removeClass('is-active');
        $('#tabungan').removeClass('is-active');

        $('#'+result).addClass('is-active');
        $('#'+form).addClass('is-active');
        $('#'+id).addClass('is-active');
    }

    var valRange = 1;
    var zakat = '';

    function toRp(typeZakat){
        zakat = typeZakat;
        var angka = '';
        if(typeZakat=='penghasilan'){

            var valPenghasilanProfesi = $('#valPenghasilanProfesi').val(),
            valPenghasilanLain = $('#valPenghasilanLain').val(), 
            valPenghasilanHutang = $('#valPenghasilanHutang').val();
            
            if(valPenghasilanProfesi==null){valPenghasilanProfesi=0}
            if(valPenghasilanLain==null){valPenghasilanLain=0}
            if(valPenghasilanHutang==null){valPenghasilanHutang=0}

            angka = 2.5 / 100 * (Number(valPenghasilanProfesi) + Number(valPenghasilanLain) - Number(valPenghasilanHutang)) * valRange;
            if(angka < 0){
                angka=0;
            }
            
        } else if(typeZakat=='emas'){
            angka = 30;
            // console.log('emas');
            
        }

        var number_string = angka.toString().replace(/[^,\d]/g, ''),
			split	= number_string.split(','),
			sisa 	= split[0].length % 3,
			rupiah 	= split[0].substr(0, sisa),
			ribuan 	= split[0].substr(sisa).match(/\d{3}/gi);
			
		if (ribuan) {
			separator = sisa ? '.' : '';
			rupiah += separator + ribuan.join('.');
		}
		prefix = '';
		rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
        
        document.getElementById("result"+typeZakat).innerHTML = '';
        document.getElementById("result"+typeZakat).innerHTML = rupiah;
        
        
    }

    $("input[name=rangeWaktuProfesi]").on('click', function (event) {
        /* Act on the event */
        valRange = Number($("input[name=rangeWaktuProfesi]:checked").val());
        toRp(zakat);
        // console.log(zakat);
    });
</script>
@section('script')
@show
</body>
</html>