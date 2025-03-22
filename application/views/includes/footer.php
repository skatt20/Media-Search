
</main>

<input type="hidden" id="input_base_url" value="<?= base_url(); ?>">
<!-- Scroll Top -->
<a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center"><i
    class="bi bi-arrow-up-short"></i></a>

<!-- Preloader -->
<div id="preloader"></div>

<!-- Vendor JS Files -->
<script src="<?= base_url('assets') ?>/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="<?= base_url('assets') ?>/vendor/php-email-form/validate.js"></script>
<script src="<?= base_url('assets') ?>/vendor/aos/aos.js"></script>
<script src="<?= base_url('assets') ?>/vendor/swiper/swiper-bundle.min.js"></script>

<!-- Main JS File -->
<script src="<?= base_url('assets') ?>/js/main.js"></script>


<script src="<?= base_url('assets/'); ?>node_modules/jquery/jquery.min.js"></script>


<?php
__load_assets__($__assets__, 'js');
?>

</body>

</html>