'use strict';

angular.module('ddsCommon').constant('droitsDescription', {
    'prestationsNationales': {
        'assurance_retraite': {
            'label': 'Assurance retraite',
            'imgSrc': 'logo_assurance_retraite.png',
            'prestations': {
                'aspa': {
                    'label': 'Allocation de solidarité aux personnes âgées',
                    'shortLabel': 'Aspa',
                    'description': 'L’allocation de solidarité aux personnes âgées (Aspa) est une prestation mensuelle accordée aux retraités ayant de faibles ressources. Elle est versée par la Carsat (ou la MSA si vous dépendez du régime agricole). Elle s’ajoute, dans une certaine limite, à vos revenus personnels. Elle remplace le minimum vieillesse depuis 2006.',
                    'conditions': [
                        'Résider <abbr title="Métropole, Guadeloupe, Guyane, Martinique ou Réunion">en France</abbr> plus de <abbr title="180 jours, potentiellement discontinus">6 mois</abbr> cette année.',
                        'Avoir demandé toutes les retraites (générale, réversion, complémentaire…) auxquelles vous avez droit.',
                        'Votre conjoint·e doit avoir demandé toutes les retraites (générale, réversion, complémentaire…) auxquelles il ou elle a droit.'
                    ],
                    'link': 'https://www.service-public.fr/particuliers/vosdroits/F16871',
                    'form': 'https://www.formulaires.modernisation.gouv.fr/gf/cerfa_14957.do'
                },
            },
        },
        'assurance_maladie': {
            'label': 'Assurance maladie',
            'imgSrc': 'logo_assurance_maladie.png',
            'prestations': {
                'acs': {
                    'isMontantAnnuel': true,
                    'label': 'Aide au paiement d’une complémentaire santé',
                    'shortLabel': 'ACS',
                    'description': 'L’aide au paiement d’une assurance complémentaire santé (ACS) est une aide financière pour payer une complémentaire santé (mutuelle). L’ACS ouvre droit à d’autres avantages comme le tiers-payant. Une fois attribuée, l’ACS est accordée pour un an.',
                    'conditions': [
                        'Résider <abbr title="Métropole, Guadeloupe, Guyane, Martinique ou Réunion">en France</abbr> depuis plus de 3 mois.'
                    ],
                    'link': 'https://www.service-public.fr/particuliers/vosdroits/F13375',
                    'form': 'http://www.ameli.fr/fileadmin/user_upload/formulaires/S3711.pdf'
                },
                'asi': {
                    'label': 'Allocation supplémentaire d’invalidité',
                    'shortLabel': 'Asi',
                    'description': 'L’allocation supplémentaire d’invalidité (Asi) est une prestation mensuelle accordée à certaines personnes invalides. Elle s’adresse aux personnes ayant de faibles ressources et qui n’ont pas atteint l’âge de départ à la retraite. Elle s’ajoute, dans une certaine limite, à vos revenus personnels.',
                    'link': 'https://www.service-public.fr/particuliers/vosdroits/F16940'
                },
                'cmu_c': {
                    'label': 'Couverture maladie universelle complémentaire',
                    'shortLabel': 'CMU-C',
                    'description': 'La couverture maladie universelle complémentaire (CMU-C) est une protection complémentaire santé (mutuelle) gratuite. Elle est destinée aux personnes qui ont de faibles ressources et qui résident en France de manière stable et régulière. Une fois attribuée, la CMU-C est accordée pour un an. Elle est à redemander tous les ans.',
                    'conditions': [
                        'Résider <abbr title="Métropole, Guadeloupe, Guyane, Martinique ou Réunion">en France</abbr> depuis plus de 3 mois.'
                    ],
                    'link': 'https://www.service-public.fr/particuliers/vosdroits/F10027',
                    'form': 'http://www.ameli.fr/fileadmin/user_upload/formulaires/S3711.pdf'
                },
            },
        },
        'caf': {
            'label': 'Caisse d’allocations familiales',
            'imgSrc': 'logo_caf.png',
            'prestations': {
                'af': {
                    'label': 'Allocations familiales',
                    'shortLabel': 'AF',
                    'description': 'Les allocations familiales sont versées tous les mois aux personnes ayant au moins deux enfants de moins de vingt ans à charge. Le montant des prestations dépend des ressources, du nombre d’enfants à charge et de leur âge. Dans les DOM, les allocations sont versées à partir du premier enfant.',
                    'conditions': [
                        'Résider <abbr title="Métropole, Guadeloupe, Guyane, Martinique ou Réunion">en France</abbr> plus de <abbr title="180 jours, potentiellement discontinus">6 mois</abbr> cette année.'
                    ],
                    'link': 'https://www.service-public.fr/particuliers/vosdroits/F13213',
                    'isBaseRessourcesYearMoins2': true
                },
                'cf': {
                    'label': 'Complément familial',
                    'shortLabel': 'CF',
                    'description': '&Agrave; partir du troisième enfant à charge âgé de plus de trois ans et de moins de vingt-et-un ans, et sous certaines conditions de ressources, le complément familial est versé automatiquement. Dans les DOM, le complément familial concerne tous les enfants à charge âgés entre trois et cinq ans.',
                    'link': 'https://www.service-public.fr/particuliers/vosdroits/F13214',
                    'isBaseRessourcesYearMoins2': true
                },
                'asf': {
                    'label': 'Allocation de soutien familial',
                    'shortLabel': 'ASF',
                    'description': 'L’allocation de soutien familial (ASF) est destinée soit au parent qui élève seul un enfant non reconnu, privé de l’aide d’un parent ou dont l’autre parent est décédé, soit à la personne seule ou en couple qui recueille un enfant. L’ASF est versée par la Caf ou la MSA mensuellement.',
                    'conditions': [
                        'Ne pas toucher l’intégralité d’une pension alimentaire qui vous aurait été attribuée par une décision de justice, ou que cette pension soit d’un montant inférieur à celui de l’ASF.'
                    ],
                    'link': 'https://www.caf.fr/aides-et-services/s-informer-sur-les-aides/solidarite-et-insertion/l-allocation-de-soutien-familial-asf-0'
                },
                'paje_base': {
                    'label': 'Prestation d’accueil du jeune enfant – Allocation de base',
                    'shortLabel': 'Paje-base',
                    'description': 'L’allocation de base de la prestation d’accueil du jeune enfant (Paje) a pour objet d’aider à assurer les dépenses liées à l’entretien et l’éducation d’un enfant. Elle est destinée aux parents d’un enfant de moins de 3 ans. Elle est versée sous conditions de ressources par la Caf ou la MSA.',
                    'link': 'https://www.service-public.fr/particuliers/vosdroits/F13218',
                    'isBaseRessourcesYearMoins2': true
                },
                'rsa': {
                    'label': 'Revenu de solidarité active',
                    'shortLabel': 'RSA',
                    'description': 'Le revenu de solidarité active (RSA) assure aux personnes sans ressources un niveau minimum de revenu variable selon la composition du foyer. Le RSA, le RSA parent isolé et le RSA jeunes parents sont simulés. Financé par les conseils départementaux, son versement se fait à travers la Caf ou la MSA.',
                    'conditions': [
                        'Signer un <a target="_blank" rel="noopener" href="http://social-sante.gouv.fr/affaires-sociales/lutte-contre-l-exclusion/droits-et-aides/le-revenu-de-solidarite-active-rsa/article/quels-sont-les-droits-et-devoirs-des-beneficiaires-du-rsa" title="Détails sur les droits et devoirs des bénéficiaires du RSA">contrat d’engagement réciproque</a> avec votre département.',
                        'Résider en France plus de 9 mois par an.',
                        'Si vous êtes ressortissant·e d’un pays de l’UE, de l’EEE ou Suisse, résider en France depuis plus de 3 mois.',
                        'Si vous êtes ressortissant·e d’un autre pays, résider en France depuis plus de 5 ans.'
                    ],
                    'link': 'https://www.service-public.fr/particuliers/vosdroits/N19775',
                    'form': 'https://www.formulaires.modernisation.gouv.fr/gf/cerfa_15481.do',
                    'uncomputability': {
                        'tns': {
                            'reason': 'vous avez des revenus en tant qu’indépendant·e',
                            'solution': 'Vous pouvez demander à bénéficier du RSA, mais c’est le président de votre conseil départemental qui <a target="_blank" rel="noopener" title="Article R262-23 du code de l’action sociale" href="https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000028251799&cidTexte=LEGITEXT000006074069">décidera</a> de la manière dont vos revenus non salariés impacteront le montant de votre aide.'
                        },
                        'conjoint_tns': {
                            'reason': 'votre conjoint·e a des revenus en tant qu’indépendant·e',
                            'solution': 'Vous pouvez demander à bénéficier du RSA, mais c’est le président de votre conseil départemental qui <a target="_blank" rel="noopener" title="Article R262-23 du code de l’action sociale" href="https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000028251799&cidTexte=LEGITEXT000006074069">décidera</a> de la manière dont les revenus non salariés de votre conjoint·e impacteront le montant de votre aide.'
                        }
                    }
                },
                'aide_logement': {
                    'label': 'Aides au logement',
                    'shortLabel': 'AL',
                    'description': 'Les aides au logement regroupent trois aides différentes non cumulables : l’aide personnalisée au logement (Apl), l’allocation de logement familiale (Alf ) et l’allocation de logement sociale (Als). Elles concernent les personnes aux ressources modestes qui paient un logement ou remboursent le prêt de leur résidence principale. Elles sont versées par la Caf ou la MSA.',
                    'conditions': [
                        'Résider au moins 8 mois par an dans le logement que vous avez décrit.',
                        'Le logement doit être <a target="_blank" rel="noopener" href="https://www.caf.fr/aides-et-services/connaitre-vos-droits-selon-votre-situation/vous-louez-ou-vous-achetez-un-logement/vous-occupez-un-logement-insalubre-ou-non-decent" title="9 mètres carrés par personne, fenêtre, WC, eau potable, électricité" >décent</a>.'
                    ],
                    'link': 'https://www.service-public.fr/particuliers/vosdroits/N20360',
                    'teleservice': 'https://wwwd.caf.fr/wps/portal/caffr/aidesetservices/lesservicesenligne/faireunedemandedeprestation/demanderlaideaulogement/',
                    'isBaseRessourcesYearMoins2': true,
                    'uncomputability': {
                        'primo_accedant': {
                            'reason': 'vous êtes <abbr title="Non propriétaire de votre résidence principale dans les deux années précédant l’achat de votre résidence actuelle">primo-accédant</abbr> à la propriété de votre résidence principale',
                            'solution': 'Le <a target="_blank" rel="noopener" href="https://wwwd.caf.fr/wps/portal/caffr/aidesetservices/lesservicesenligne/estimervosdroits/lelogement">simulateur de la CAF</a> pourra estimer vos droits sur la base de la valeur de votre bien.'
                        },
                        'locataire_foyer': {
                            'reason': 'vous logez dans un foyer',
                            'solution': 'Le <a target="_blank" rel="noopener" href="https://wwwd.caf.fr/wps/portal/caffr/aidesetservices/lesservicesenligne/estimervosdroits/lelogement">simulateur de la CAF</a> vous donnera des estimations selon les différentes conventions possibles de votre foyer.'
                        }
                    }
                },
                'ppa': {
                    'label': 'Prime d’activité',
                    'shortLabel': 'pda',
                    'description': 'La prime d’activité remplace le RSA activité et la prime pour l’emploi. Les travailleurs de 18 ans ou plus, les étudiants salariés et apprentis et les non-salariés peuvent en bénéficier sous certaines conditions. La demande de prime d’activité peut se faire à travers un téléservice sur, selon votre cas, le site de la Caf ou de la MSA',
                    'link': 'https://www.service-public.fr/particuliers/vosdroits/F2882',
                    'teleservice': 'https://wwwd.caf.fr/wps/portal/caffr/aidesetservices/lesservicesenligne/faireunedemandedeprestation/demanderlaprimedactivite/'
                },
                'aah': {
                    'isMontantAnnuel': false,
                    'label': 'Allocation aux adultes handicapés',
                    'shortLabel': 'AAH',
                    'description': 'L’allocation aux adultes handicapés (AAH) est une aide financière qui permet d’assurer un revenu minimum. Cette aide est attribuée sous réserve de respecter 4 critères : votre taux d’incapacité, votre âge, votre nationalité et vos ressources. L’AAH peut se cumuler soit avec le complément de ressources, soit avec la majoration pour la vie autonome ou, dans certains cas, l’aide à l’autonomie.',
                    'isBaseRessourcesYearMoins2': true,
                    'uncomputability': {
                        'intervention_CDAPH_necessaire': {
                            'reason': 'votre taux d’incapacité sera déterminé par la <abbr title="Commission des droits et de l’autonomie des personnes handicapées">CDAPH</abbr> après le dépôt de votre demande',
                            'solution': 'Contactez <a target="_blank" rel="noopener" href="https://informations.handicap.fr/carte-france-mdph.php">la <abbr title="Maison départementale des personnes handicapées">MDPH</abbr> la plus proche</a> pour faire établir ce taux. Attention, votre éligibilité à l’AAH peut impacter vos droits au RSA et à la CMU-C.'
                        }
                    },
                    'link': 'https://www.service-public.fr/particuliers/vosdroits/F12242'
                },
            },
        },
        'pole_emploi': {
            'label': 'Pôle emploi',
            'imgSrc': 'logo_pole_emploi.png',
            'prestations': {
                'ass': {
                    'label': 'Allocation de solidarité spécifique',
                    'shortLabel': 'ASS',
                    'description': 'L’allocation de solidarité spécifique (ASS) est attribuée aux personnes ayant épuisé leurs droits au chômage sous conditions d’activité antérieure et de ressources. Elle peut être versée à taux plein ou à taux réduit. En cas de reprise d’activité, elle peut être maintenue.',
                    'link': 'https://www.service-public.fr/particuliers/vosdroits/F12484'
                },
            },
        },
        'education_nationale': {
            'label': 'Éducation nationale',
            'imgSrc': 'logo_education_nationale.png',
            'prestations': {
                'bourse_college': {
                    'isMontantAnnuel': true,
                    'label': 'Bourse de collège',
                    'shortLabel': 'Bourse collège',
                    'description': 'La bourse de collège est une aide destinée à favoriser la scolarité des collégiens. Elle est versée sous conditions de ressources. Son montant dépend du nombre d’enfants à charge. Vous devez déposer votre dossier de demande entre la rentrée scolaire et la fin du mois de septembre.',
                    'link': 'https://www.service-public.fr/particuliers/vosdroits/F984',
                    'isBaseRessourcesYearMoins2': true
                },
                'bourse_lycee': {
                    'isMontantAnnuel': true,
                    'label': 'Bourse de lycée',
                    'shortLabel': 'Bourse lycée',
                    'description': 'La bourse de lycée est accordée, sous condition de ressources, au(x) responsable(s) d’un lycéen. Si l’élève entre au lycée ou s’il n’a jamais touché de bourse de lycée, il pourra y prétendre selon les ressources et les charges de sa famille. Une nouvelle demande doit être effectuée en cas de redoublement ou réorientation.',
                    'link': 'https://www.service-public.fr/particuliers/vosdroits/F616',
                    'isBaseRessourcesYearMoins2': true
                },
            },
        },
    },
    'partenairesLocaux': {
        'paris': {
            'imgSrc': 'logo_paris.png',
            'label': 'Ville de Paris',
            'prefix': 'de la',
            'prestations': {
                'paris_logement_familles': {
                    'isMontantAnnuel': false,
                    'label': 'Paris Logement Famille',
                    'shortLabel': 'PLF',
                    'description': 'L’allocation Paris Logement Famille est destinée aux familles d’au moins deux enfants ou ayant un enfant handicapé. Elle leur permet de mieux supporter leurs dépenses de logement. L’aide est accordée pour une durée maximale de un an. Elle peut être renouvelée en présentant un nouveau dossier.',
                    'conditions': [
                        'Avoir demandé le versements des aides logement auxquelles vous avez droit auprès de la CAF.',
                        'Ne toucher aucune autre prestation logement de la part de la mairie de Paris ou du département.'
                    ],
                    'link': 'http://www.paris.fr/services-et-infos-pratiques/aides-et-demarches/aides-allocations-et-subventions/simulateur-mes-aides-gouv-fr-pour-la-ville-de-paris-3626#paris-logement-famille_7',
                    'form': '/documents/Formulaire_demande_PLF.pdf',
                    'isBaseRessourcesYearMoins2': false,
                    'roundToNearest10': false,
                },
                'paris_forfait_famille': {
                    'isMontantAnnuel': true,
                    'label': 'Paris Forfait Famille',
                    'shortLabel': 'PFF',
                    'description': 'Paris Forfait Famille est une aide destinée aux familles nombreuses avec au moins trois enfants à charge. Elle peut se cumuler avec l’Allocation de Soutien aux Parents d’Enfants Handicapés. L’aide est accordée pour une durée maximale de un an. Elle peut être renouvelée en présentant un nouveau dossier.',
                    'link': 'http://www.paris.fr/services-et-infos-pratiques/aides-et-demarches/aides-allocations-et-subventions/simulateur-mes-aides-gouv-fr-pour-la-ville-de-paris-3626#paris-forfait-famille_2',
                    'form': 'https://api-site.paris.fr/images/74809',
                    'isBaseRessourcesYearMoins2': false,
                    'roundToNearest10': false
                },
                'paris_logement_psol': {
                    'label': 'Paris Solidarité',
                    'shortLabel': 'PSOL',
                    'description': 'Paris Solidarité est destinée aux personnes âgées de 65 ans ou plus. L’aide peut être versée à partir de 60 ans pour les personnes reconnus inaptes au travail. Elle a pour but de garantir aux foyers modestes un minimum mensuel de ressources. L’aide est accordée pour une durée maximale de un an. À partir du 2e renouvellement, Paris Solidarité peut être accordée pour une durée maximale de deux ans.',
                    'conditions': [
                        'Percevoir tous les avantages légaux auxquels vous pouvez prétendre.',
                    ],
                    'link': 'http://www.paris.fr/services-et-infos-pratiques/aides-et-demarches/aides-allocations-et-subventions/simulateur-mes-aides-gouv-fr-pour-la-ville-de-paris-3626#paris-solidarite_3',
                    'form': 'http://api-site-cdn.paris.fr/images/154848.pdf',
                    'isBaseRessourcesYearMoins2': false,
                    'roundToNearest10': false
                },
                'paris_logement': {
                    'label': 'Paris Logement',
                    'shortLabel': 'PL',
                    'description': 'L’allocation Paris Logement est destinée aux personnes seules ou en couple sans ou avec un enfant. Elle leur permet de mieux supporter leurs dépenses de logement. Ils doivent être locataires en titre et titulaires du bail du logement occupé à titre principal. L’aide est accordée pour une durée maximale de un an. À partir du 2e renouvellement, Paris Logement peut être accordée pour une durée maximale de deux ans.',
                    'conditions': [
                        'Avoir demandé le versement des aides logement auxquelles vous avez droit auprès de la CAF.',
                        'Ne toucher aucune autre prestation logement de la part de la mairie de Paris ou du département.'
                    ],
                    'link': 'http://www.paris.fr/services-et-infos-pratiques/aides-et-demarches/aides-allocations-et-subventions/simulateur-mes-aides-gouv-fr-pour-la-ville-de-paris-3626#paris-logement_6',
                    'form': 'http://api-site-cdn.paris.fr/images/98406.pdf',
                    'isBaseRessourcesYearMoins2': false,
                    'roundToNearest10': false
                },
                'paris_logement_aspeh': {
                    'label': 'Allocation de Soutien aux Parents d’Enfants Handicapés',
                    'shortLabel': 'ASPEH',
                    'description': 'L’Allocation de Soutien aux Parents d’Enfants Handicapés est réservée aux familles ayant à charge un ou plusieurs enfants handicapés. Il s’agit d’une aide mensuelle ou au prorata du nombre de jours passés par le ou les enfants au domicile. L’aide est accordée pour un an. Elle peut être renouvelée en présentant un nouveau dossier.',
                    'link': 'http://www.paris.fr/services-et-infos-pratiques/aides-et-demarches/aides-allocations-et-subventions/simulateur-mes-aides-gouv-fr-pour-la-ville-de-paris-3626#allocation-de-soutien-aux-parents-d-enfants-handicapes_9',
                    'form': 'http://api-site-cdn.paris.fr/images/132126.pdf',
                    'isBaseRessourcesYearMoins2': false,
                    'roundToNearest10': false
                },
                'paris_logement_plfm': {
                    'label': 'Paris Logement Familles Monoparentales',
                    'shortLabel': 'PLFM',
                    'description': 'L’allocation Paris Logement Famille Monoparentale est destinée aux parents seuls, ayant un ou plusieurs enfants à charge. Elle leur permet de mieux supporter leurs dépenses de logement. Elle est ouverte aux locataires, aux propriétaires et aux personnes accédant à la propriété. L’aide est accordée pour un an. Elle peut être renouvelée en présentant un nouveau dossier.',
                    'conditions': [
                        'Avoir demandé le versement des aides logement auxquelles vous avez droit auprès de la CAF.',
                        'Ne toucher aucune autre prestation logement de la part de la mairie de Paris ou du département.'
                    ],
                    'link': 'http://www.paris.fr/services-et-infos-pratiques/aides-et-demarches/aides-allocations-et-subventions/simulateur-mes-aides-gouv-fr-pour-la-ville-de-paris-3626#paris-logement-famille-monoparentale_5',
                    'form': 'https://api-site.paris.fr/images/72423',
                    'isBaseRessourcesYearMoins2': false,
                    'roundToNearest10': false
                },
                'paris_energie_famille': {
                    'isMontantAnnuel': true,
                    'label': 'Paris Énergie Familles',
                    'shortLabel': 'PEF',
                    'description': 'L’allocation Paris Énergie Famille est réservée aux familles ayant un ou plusieurs enfants à charge, sous condition d’imposition. Cette aide permet de les soutenir dans leurs dépenses d’électricité et/ou de gaz. Paris Energie Famille est directement versée au(x) fournisseur(s) d’énergie. L’aide est accordée pour un an. Elle peut être renouvelée en présentant un nouveau dossier.',
                    'link': 'http://www.paris.fr/services-et-infos-pratiques/aides-et-demarches/aides-allocations-et-subventions/simulateur-mes-aides-gouv-fr-pour-la-ville-de-paris-3626#paris-energie-famille_8',
                    'form': 'https://api-site.paris.fr/images/154764.pdf',
                    'isBaseRessourcesYearMoins2': false,
                    'roundToNearest10': false
                },
                'paris_complement_sante': {
                    'isMontantAnnuel': true,
                    'label': 'Complément Santé Paris',
                    'shortLabel': 'CSP',
                    'description': 'Le Complément Santé Paris est destiné aux personnes âgées de 65 ans ou plus. L’aide peut être versée à partir de 60 ans pour les personnes reconnus inaptes au travail. Elle a pour but d’aider les foyers modestes à obtenir une mutuelle. L’aide est accordée pour une durée maximale de un an. À partir du 2e renouvellement, le Complément Santé Paris peut être accordé pour une durée maximale de deux ans.',
                    'link': 'http://www.paris.fr/services-et-infos-pratiques/aides-et-demarches/aides-allocations-et-subventions/simulateur-mes-aides-gouv-fr-pour-la-ville-de-paris-3626#complement-sante-paris_10',
                    'form': 'https://api-site.paris.fr/images/78343',
                    'isBaseRessourcesYearMoins2': false,
                    'roundToNearest10': false
                }
            }
        },
        'cd93': {
            'imgSrc': 'logo_cd93.png',
            'label': 'Département de Seine-Saint-Denis',
            'prefix': 'du',
            'prestations': {
                'adpa': {
                    'isMontantAnnuel': false,
                    'unit': '%',
                    'legend': 'des frais de dépendance',
                    'label': 'Allocation départementale personnalisée d’autonomie',
                    'shortLabel': 'ADPA',
                    'description': 'Allocation versée aux personnes dépendantes âgées de plus de 60 ans. Elle a pour objectif de financer des services d’aide à la personne favorisant leur autonomie dans les gestes quotidiens.',
                    'conditions': [],
                    'link': 'https://www.seine-saint-denis.fr/ADPA.html',
                    'form': 'https://www.seine-saint-denis.fr/IMG/pdf/formulaire_demande_adpa_mai_2016_vdef.pdf',
                    'isBaseRessourcesYearMoins2': false
                },
            }
        }
    }
});
