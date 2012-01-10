--
-- Table structure for table `iplimit`
--

CREATE TABLE `iplimit` (
  `id` int(11) NOT NULL auto_increment,
  `ip` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `ip` (`ip`)
) ENGINE=MEMORY DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `iplog`
--

CREATE TABLE `iplog` (
  `id` int(11) NOT NULL auto_increment,
  `granted_access` tinyint(2) NOT NULL default '0',
  `ip` varchar(255) NOT NULL,
  `query_string` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
