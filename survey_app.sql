-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 19, 2026 at 03:38 AM
-- Server version: 9.1.0
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `survey_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
CREATE TABLE IF NOT EXISTS `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
CREATE TABLE IF NOT EXISTS `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

DROP TABLE IF EXISTS `kategori`;
CREATE TABLE IF NOT EXISTS `kategori` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `ktg_nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kategori`
--

INSERT INTO `kategori` (`id`, `ktg_nama`, `created_at`, `updated_at`) VALUES
(12, 'Walas', '2026-02-11 00:10:20', '2026-02-11 00:10:20'),
(13, 'GPA', '2026-02-12 19:56:49', '2026-02-12 19:56:49'),
(14, 'Mapel', '2026-02-12 20:13:43', '2026-02-12 20:22:02'),
(15, 'Rekan Kerja', '2026-02-12 20:22:57', '2026-02-12 20:22:57'),
(16, 'Orang Tua', '2026-02-12 20:32:53', '2026-02-12 20:32:53');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_11_01_025028_create_kategoris_table', 1),
(5, '2025_11_01_025106_create_periodes_table', 1),
(6, '2025_11_01_025146_create_pertanyaans_table', 1),
(7, '2025_11_01_034009_create_personal_access_tokens_table', 1),
(8, '2025_11_01_050847_create_respondens_table', 1),
(9, '2025_11_01_050848_create_penilaians_table', 1),
(10, '2025_11_01_050944_create_penilaian_details_table', 1),
(11, '2025_11_06_063237_create_surveys_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `penilaian`
--

DROP TABLE IF EXISTS `penilaian`;
CREATE TABLE IF NOT EXISTS `penilaian` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `responden_id` bigint UNSIGNED NOT NULL,
  `prd_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `penilaian_responden_id_foreign` (`responden_id`),
  KEY `penilaian_prd_id_foreign` (`prd_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `penilaian`
--

INSERT INTO `penilaian` (`id`, `responden_id`, `prd_id`, `created_at`, `updated_at`) VALUES
(32, 22, 13, '2026-02-18 20:19:27', '2026-02-18 20:19:27'),
(33, 23, 13, '2026-02-18 20:28:57', '2026-02-18 20:28:57');

-- --------------------------------------------------------

--
-- Table structure for table `penilaian_detail`
--

DROP TABLE IF EXISTS `penilaian_detail`;
CREATE TABLE IF NOT EXISTS `penilaian_detail` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `penilaian_id` bigint UNSIGNED NOT NULL,
  `prtn_id` bigint UNSIGNED NOT NULL,
  `jawaban` tinyint UNSIGNED NOT NULL COMMENT 'Jawaban dalam skala 1-5',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `penilaian_detail_penilaian_id_foreign` (`penilaian_id`),
  KEY `penilaian_detail_prtn_id_foreign` (`prtn_id`)
) ENGINE=InnoDB AUTO_INCREMENT=228 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `penilaian_detail`
--

INSERT INTO `penilaian_detail` (`id`, `penilaian_id`, `prtn_id`, `jawaban`, `created_at`, `updated_at`) VALUES
(218, 32, 24, 3, '2026-02-18 20:19:27', '2026-02-18 20:19:27'),
(219, 32, 25, 2, '2026-02-18 20:19:27', '2026-02-18 20:19:27'),
(220, 32, 26, 4, '2026-02-18 20:19:27', '2026-02-18 20:19:27'),
(221, 32, 27, 5, '2026-02-18 20:19:27', '2026-02-18 20:19:27'),
(222, 32, 28, 4, '2026-02-18 20:19:27', '2026-02-18 20:19:27'),
(223, 33, 24, 3, '2026-02-18 20:28:57', '2026-02-18 20:28:57'),
(224, 33, 25, 4, '2026-02-18 20:28:57', '2026-02-18 20:28:57'),
(225, 33, 26, 3, '2026-02-18 20:28:57', '2026-02-18 20:28:57'),
(226, 33, 27, 5, '2026-02-18 20:28:57', '2026-02-18 20:28:57'),
(227, 33, 28, 3, '2026-02-18 20:28:57', '2026-02-18 20:28:57');

-- --------------------------------------------------------

--
-- Table structure for table `periode`
--

DROP TABLE IF EXISTS `periode`;
CREATE TABLE IF NOT EXISTS `periode` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `ktg_id` bigint UNSIGNED NOT NULL,
  `prd_tgl_mulai` date NOT NULL,
  `prd_tgl_selesai` date NOT NULL,
  `prd_status` smallint NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `periode_ktg_id_foreign` (`ktg_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `periode`
--

INSERT INTO `periode` (`id`, `ktg_id`, `prd_tgl_mulai`, `prd_tgl_selesai`, `prd_status`, `created_at`, `updated_at`) VALUES
(13, 12, '2026-02-25', '2026-02-28', 0, '2026-02-11 00:10:43', '2026-02-11 00:10:43'),
(16, 13, '2026-02-13', '2026-02-20', 1, '2026-02-12 19:57:39', '2026-02-12 19:57:39'),
(17, 14, '2026-02-13', '2026-02-22', 0, '2026-02-12 20:13:57', '2026-02-12 20:13:57'),
(18, 15, '2026-02-13', '2026-02-20', 1, '2026-02-12 20:23:11', '2026-02-12 20:41:24'),
(19, 16, '2026-02-01', '2026-02-18', 0, '2026-02-12 20:33:17', '2026-02-12 20:33:17');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 12, 'AuthToken', '4d7d0a74a5c810aabd60b65348d71eea0cadaab99d8ae62ff817d2e56a74b17b', '[\"*\"]', NULL, NULL, '2025-11-14 20:58:28', '2025-11-14 20:58:28'),
(2, 'App\\Models\\User', 12, 'AuthToken', '1c99d7a1c1758f2386417ccb1e97c68f53161b3add07786ccd989c5369f5e758', '[\"*\"]', '2025-11-14 21:29:55', NULL, '2025-11-14 20:58:43', '2025-11-14 21:29:55'),
(3, 'App\\Models\\User', 12, 'AuthToken', '9c9f90e60549e4edafcb23d686e0f083bf3ac1c5355bb21ca7b15417d42e3f2c', '[\"*\"]', '2025-11-14 21:16:21', NULL, '2025-11-14 21:06:16', '2025-11-14 21:16:21'),
(4, 'App\\Models\\User', 12, 'AuthToken', '91f25733ef7cf63fb22f1de51585eca11134f7c2be07a7d18a5c3b8144293e67', '[\"*\"]', '2025-11-19 02:00:43', NULL, '2025-11-19 02:00:15', '2025-11-19 02:00:43'),
(6, 'App\\Models\\User', 12, 'AuthToken', '25aa0965522b2cdc880dc89ba5012846225ccf88731ca1b9e64565d83546b158', '[\"*\"]', '2026-02-03 05:37:31', NULL, '2026-02-03 05:31:12', '2026-02-03 05:37:31'),
(7, 'App\\Models\\User', 12, 'AuthToken', '30a56a71fa5345aa659add024727f79b07ebd4908455f2becc1a642c2e3df26c', '[\"*\"]', '2026-02-03 06:32:26', NULL, '2026-02-03 06:31:42', '2026-02-03 06:32:26'),
(9, 'App\\Models\\User', 12, 'AuthToken', 'fac231ea57fb1a5be51bea39bafae89d88444e3a13cd163028972dcc26152591', '[\"*\"]', '2026-02-04 01:23:53', NULL, '2026-02-04 00:45:38', '2026-02-04 01:23:53'),
(10, 'App\\Models\\User', 12, 'AuthToken', 'd1b5d64efa97b626cc7ba123fbce00d7538c7629f58a72950ab189c516efc41d', '[\"*\"]', '2026-02-11 00:57:15', NULL, '2026-02-11 00:08:25', '2026-02-11 00:57:15'),
(11, 'App\\Models\\User', 12, 'AuthToken', '20b1042ccf482eb04eed596217a6b19792ac64a4f6c38e350a8db00edd38a34c', '[\"*\"]', '2026-02-11 01:11:58', NULL, '2026-02-11 00:57:40', '2026-02-11 01:11:58'),
(12, 'App\\Models\\User', 12, 'AuthToken', '3338c61e5d0d7761ccb53b9f08cac54ed294d112bdd5838924382cde36ce458d', '[\"*\"]', '2026-02-13 01:40:05', NULL, '2026-02-12 19:47:53', '2026-02-13 01:40:05'),
(13, 'App\\Models\\User', 12, 'AuthToken', '4640653e271713c91bb8dfe9eb117701d36683ee7c5b85daeb4f9131c5bdb22f', '[\"*\"]', '2026-02-18 20:15:32', NULL, '2026-02-18 20:12:03', '2026-02-18 20:15:32');

-- --------------------------------------------------------

--
-- Table structure for table `pertanyaan`
--

DROP TABLE IF EXISTS `pertanyaan`;
CREATE TABLE IF NOT EXISTS `pertanyaan` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `ktg_id` bigint UNSIGNED NOT NULL,
  `prtn_isi` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pertanyaan_ktg_id_foreign` (`ktg_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pertanyaan`
--

INSERT INTO `pertanyaan` (`id`, `ktg_id`, `prtn_isi`, `created_at`, `updated_at`) VALUES
(24, 12, 'Bagaimana Ustadz/Ustadzah mampu menjaga suasana kelas yang tertib dan kondusif?', '2026-02-11 01:10:53', '2026-02-11 01:10:53'),
(25, 12, 'Seberapa efektif Ustadz/Ustadzah dalam merencanakan dan melaksanakan pembelajaran?', '2026-02-11 01:11:21', '2026-02-11 01:11:21'),
(26, 12, 'Apakah Ustadz/Ustadzah memberi informasi secara rutin tentang perkembangan anak?', '2026-02-11 01:11:33', '2026-02-11 01:11:33'),
(27, 12, 'Bagaimana Ustadz/Ustadzah merespon dan menindaklanjuti masukan dari atasan?', '2026-02-11 01:11:43', '2026-02-11 01:11:43'),
(28, 12, 'Bagaimana Ustadz/Ustadzah memberikan umpan balik yang membangun kepada siswa?', '2026-02-12 19:48:31', '2026-02-12 19:48:31'),
(29, 13, 'Bagaimana Ustadz/Ustadzah menunjukkan sikap tanggung jawab terhadap anak-anak?', '2026-02-12 19:58:09', '2026-02-12 19:58:09'),
(30, 13, 'Seberapa mampu menangani situasi sulit dengan anak secara bijak ?', '2026-02-12 20:01:11', '2026-02-12 20:01:11'),
(32, 13, 'Apakah Ustadz/Ustadzah menunjukkan sikap sopan dan santun dalam bekerja?', '2026-02-12 20:02:14', '2026-02-12 20:02:14'),
(33, 13, 'Bagaimana Ustad/Ustadzah membantu anak berkembang secara sosial dan emosional?', '2026-02-12 20:02:47', '2026-02-12 20:02:47'),
(34, 13, 'Bagaimana Ustadz/Ustadzah merespon dan menindaklanjuti masukan dari atasan?', '2026-02-12 20:02:56', '2026-02-12 20:02:56'),
(35, 14, 'Bagaimana Ustadz/Ustadzah yang bersangkutan menunjukkan penguasaan materi pelajaran?', '2026-02-12 20:18:23', '2026-02-12 20:18:23'),
(36, 14, 'Seberapa efektif Ustadz/Ustadzah dalam merencanakan dan melaksanakan pembelajaran?', '2026-02-12 20:18:33', '2026-02-12 20:18:33'),
(37, 14, 'Bagaimana Ustadz/Ustadzah memberikan umpan balik yang membangun kepada siswa?', '2026-02-12 20:18:42', '2026-02-12 20:18:42'),
(38, 14, 'Seberapa baik Ustadz/Ustadzah berkolaborasi dengan rekan Ustadz/Ustadzah dalam pengembangan program?', '2026-02-12 20:18:51', '2026-02-12 20:18:51'),
(39, 14, 'Bagaimana Ustadz/Ustadzah merespon dan menindaklanjuti masukan dari atasan?', '2026-02-12 20:18:58', '2026-02-12 20:18:58'),
(40, 15, 'Bagaimana Ustadz/Ustadzah berbagi pengetahuan dan pengalaman dengan rekan sejawat?', '2026-02-12 20:39:13', '2026-02-12 20:39:13'),
(41, 15, 'Seberapa baik Ustadz/Ustadzah bekerja sama dalam tim atau kegiatan sekolah?', '2026-02-12 20:39:21', '2026-02-12 20:39:21'),
(42, 15, 'Bagaimana Ustadz/Ustadzah berkomunikasi secara terbuka dan efektif dengan rekan sejawat?', '2026-02-12 20:39:29', '2026-02-12 20:39:29'),
(43, 15, 'Seberapa proaktif Ustadz/Ustadzah dalam memberikan bantuan atau dukungan kepada rekan?', '2026-02-12 20:39:37', '2026-02-12 20:39:37'),
(44, 15, 'Bagaimana Ustadz/Ustadzah menerima masukan atau kritik dari rekan sejawat?', '2026-02-12 20:39:46', '2026-02-12 20:39:46'),
(45, 16, 'Seberapa mudah orang tua/wali murid berkomunikasi dengan Ustadz/Ustadzah?', '2026-02-12 20:40:03', '2026-02-12 20:40:03'),
(46, 16, 'Bagaimana Ustadz/Ustadzah menyampaikan informasi terkait perkembangan belajar siswa?', '2026-02-12 20:40:13', '2026-02-12 20:40:13'),
(47, 16, 'Seberapa responsif Ustadz/Ustadzah terhadap pertanyaan atau keluhan dari orang tua?', '2026-02-12 20:40:23', '2026-02-12 20:40:23'),
(48, 16, 'Bagaimana Ustadz/Ustadzah menciptakan hubungan yang positif dengan orang tua/wali murid?', '2026-02-12 20:40:32', '2026-02-12 20:40:32'),
(49, 16, 'Menurut Anda, seberapa peduli Ustadz/Ustadzah terhadap kebutuhan belajar siswa?', '2026-02-12 20:40:39', '2026-02-12 20:40:39');

-- --------------------------------------------------------

--
-- Table structure for table `responden`
--

DROP TABLE IF EXISTS `responden`;
CREATE TABLE IF NOT EXISTS `responden` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `periode_id` bigint UNSIGNED NOT NULL,
  `svy_nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `svy_jabatan` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `svy_nomor_whatsapp` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `responden_periode_id_foreign` (`periode_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `responden`
--

INSERT INTO `responden` (`id`, `periode_id`, `svy_nama`, `svy_jabatan`, `svy_nomor_whatsapp`, `created_at`, `updated_at`) VALUES
(22, 13, 'Bintang fauzan', 'Programmer', '09090990', '2026-02-18 20:19:27', '2026-02-18 20:19:27'),
(23, 13, 'Bintang fauzan', 'Data Collector', '09090990', '2026-02-18 20:28:57', '2026-02-18 20:28:57');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('9XGsM96pYGp7bOT1ezxBOq6LsmXHvonJWfBOJFV6', NULL, '127.0.0.1', 'PostmanRuntime/7.49.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZ2xSYVVJUmk2Y3hRWjZMakM0N1Q3N0M2MlVGbFhmM3ZZaVROam56TiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1763180181);

-- --------------------------------------------------------

--
-- Table structure for table `surveys`
--

DROP TABLE IF EXISTS `surveys`;
CREATE TABLE IF NOT EXISTS `surveys` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `period_id` bigint UNSIGNED NOT NULL,
  `category_id` bigint UNSIGNED NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `surveys_slug_unique` (`slug`),
  KEY `surveys_user_id_foreign` (`user_id`),
  KEY `surveys_period_id_foreign` (`period_id`),
  KEY `surveys_category_id_foreign` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `surveys`
--

INSERT INTO `surveys` (`id`, `title`, `description`, `user_id`, `period_id`, `category_id`, `slug`, `status`, `created_at`, `updated_at`) VALUES
(13, 'Link Walas', 'Survei untuk wali kelas.', 12, 13, 12, 'link-walas-nfyzro', 1, '2026-02-12 20:23:43', '2026-02-12 21:28:24'),
(14, 'Link GPA', 'Survei ini diisi oleh Guru Pendamping dan Guru Mapel', 12, 16, 13, 'link-gpa-kdb76o', 0, '2026-02-12 20:24:31', '2026-02-12 20:24:31'),
(15, 'Link Mapel', 'Survei diisi oleh Guru Pendamping dan Guru Mapel.', 12, 17, 14, 'link-mapel-gqpdjf', 0, '2026-02-12 20:28:01', '2026-02-12 20:34:08'),
(16, 'Link Rekan Kerja', 'Suvei diisi oleh Guru Pendamping dan Guru Mapel', 12, 18, 15, 'link-rekan-kerja-f0qhcz', 0, '2026-02-12 20:28:47', '2026-02-12 20:28:47'),
(17, 'Link Orang tua', 'Survei diisi oleh orang tua.', 12, 19, 16, 'link-orang-tua-bquw8j', 0, '2026-02-12 20:38:05', '2026-02-12 20:38:05');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('admin','santri') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'santri',
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `role`, `email`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Test User', 'santri', 'test@example.com', '$2y$12$/sn64rjOyPZ5eLlAlNv97eVxtpNTWdqntz/AU.RO00qi9KI2pX6b6', 'B6so8Qy6o1', '2025-11-14 20:43:56', '2025-11-14 20:43:56'),
(2, 'Administrator', 'admin', 'admin@example.com', '$2y$12$lmZf7OCmdaKT0H2zRWPBG.TALbbkVHD1bs4050OYcK5gtITNd3KZ6', NULL, '2025-11-14 20:57:41', '2025-11-14 20:57:41'),
(3, 'Zaenab Safitri', 'santri', 'bhassanah@example.org', '$2y$12$BOOttBDW.6yy6zwHjCWSEeI0ZWDhczoEtqovUd1SvW28Bz5OsIspi', NULL, '2025-11-14 20:57:42', '2025-11-14 20:57:42'),
(4, 'Reza Tamba', 'santri', 'wsimanjuntak@example.com', '$2y$12$NIR3rnsPFP1F0YrPRhXsUOISQVd0OUZM5RQFuVvehI2gBubipFNdC', NULL, '2025-11-14 20:57:42', '2025-11-14 20:57:42'),
(5, 'Jarwadi Vero Sihombing S.Farm', 'santri', 'dongoran.karsana@example.net', '$2y$12$H2e5pvUqxXuXXzzX2fF8E.ezyqkzMbOO4UUIVoSaJXRkmE1NFU0lm', NULL, '2025-11-14 20:57:42', '2025-11-14 20:57:42'),
(6, 'Sari Jane Mandasari', 'santri', 'lega42@example.org', '$2y$12$l2NY8KxsfETC3q95EvfA0.kHKl3AAiFGXYFe1wVLU8YndpI/cl36C', NULL, '2025-11-14 20:57:42', '2025-11-14 20:57:42'),
(7, 'Oni Septi Agustina', 'santri', 'usamah.vivi@example.com', '$2y$12$75fqLpmFqeqvzqUCm2dnsuDm.BdCaVsFLSxqM20o4ddU57PdJfrkC', NULL, '2025-11-14 20:57:43', '2025-11-14 20:57:43'),
(8, 'Aditya Pangestu', 'santri', 'jelita.wahyuni@example.net', '$2y$12$HyPaGRPygTBCSu0O8sLCOeZcWyLyuN7e/vrCSI.r6x.tHD3isOyA6', NULL, '2025-11-14 20:57:43', '2025-11-14 20:57:43'),
(9, 'Ghaliyati Wijayanti', 'santri', 'wani.handayani@example.com', '$2y$12$STnhkPy3JzYJ/w9G7IbyYeo8BzrQ.DQelUPp8QghKLxjLCxIplnV2', NULL, '2025-11-14 20:57:43', '2025-11-14 20:57:43'),
(10, 'Baktianto Jailani', 'santri', 'psitumorang@example.net', '$2y$12$5v4c1POfrQWUwSBx7IlFpuM9pC5os7MBSx6tvL93WqwcyxJWiREN2', NULL, '2025-11-14 20:57:43', '2025-11-14 20:57:43'),
(11, 'Hamima Puspasari', 'santri', 'owibisono@example.net', '$2y$12$vuq6M4z63sdk7vbiks9H7uc8b2xKFTW1PWYBjx1JodMjWn4pHhzs.', NULL, '2025-11-14 20:57:43', '2025-11-14 20:57:43'),
(12, 'Admin 1', 'admin', 'admin@gmail.com', '$2y$12$20acG6U4UhALUB7SvQAlNeqmWrbpgd5qQrdAuCBQbSYyX990bR6im', NULL, '2025-11-14 20:58:28', '2025-11-14 20:58:28');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `penilaian`
--
ALTER TABLE `penilaian`
  ADD CONSTRAINT `penilaian_prd_id_foreign` FOREIGN KEY (`prd_id`) REFERENCES `periode` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `penilaian_responden_id_foreign` FOREIGN KEY (`responden_id`) REFERENCES `responden` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `penilaian_detail`
--
ALTER TABLE `penilaian_detail`
  ADD CONSTRAINT `penilaian_detail_penilaian_id_foreign` FOREIGN KEY (`penilaian_id`) REFERENCES `penilaian` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `penilaian_detail_prtn_id_foreign` FOREIGN KEY (`prtn_id`) REFERENCES `pertanyaan` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `periode`
--
ALTER TABLE `periode`
  ADD CONSTRAINT `periode_ktg_id_foreign` FOREIGN KEY (`ktg_id`) REFERENCES `kategori` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pertanyaan`
--
ALTER TABLE `pertanyaan`
  ADD CONSTRAINT `pertanyaan_ktg_id_foreign` FOREIGN KEY (`ktg_id`) REFERENCES `kategori` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `responden`
--
ALTER TABLE `responden`
  ADD CONSTRAINT `responden_periode_id_foreign` FOREIGN KEY (`periode_id`) REFERENCES `periode` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `surveys`
--
ALTER TABLE `surveys`
  ADD CONSTRAINT `surveys_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `kategori` (`id`),
  ADD CONSTRAINT `surveys_period_id_foreign` FOREIGN KEY (`period_id`) REFERENCES `periode` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `surveys_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
