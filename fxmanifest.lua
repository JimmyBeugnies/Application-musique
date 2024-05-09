fx_version 'cerulean'
games { 'gta5' }

author 'booftoo'
description 'App lbphone musique'
version '1.0.0'

-- Indique où se trouve la page HTML principale.
ui_page 'index.html'

-- Liste tous les fichiers qui font partie du projet
files {
    'index.html',
    'style.css', -- Assure-toi que le chemin est correct si ton CSS est dans un sous-dossier
    'script.js',  -- Assure-toi que le chemin est correct si ton JS est dans un sous-dossier
    'Assets/**',  -- Inclut tous les fichiers dans le dossier Assets
    'Bibliothèque/**', -- Inclut tous les fichiers dans le dossier Bibliothèque
    'Lecteur/**', -- Inclut tous les fichiers dans le dossier Lecteur
    'Recherche/**' -- Inclut tous les fichiers dans le dossier Recherche
}

lua54 'yes'