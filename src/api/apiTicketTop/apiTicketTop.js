// USER DATA
const apiTicketTop2 = [
    {
        id: 1,
        thumbnail: require('../../../public/ticket/thumbnail/tiket-01.jpg'),
        pictureDetail: require('../../../public/ticket/thumbnail/tiket-01.jpg'),
        schedule: [
            { id: 1, date: '18 Januari 2025', time: '08:00 - 17:00' },
            { id: 2, date: '19 Januari 2025', time: '08:00 - 17:00' },
            { id: 3, date: '20 Januari 2025', time: '08:00 - 17:00' },
        ],
        saleEndsDate: '15 Januari 2025',
        day: 3,
        title: 'Cinta Kepada Allah',
        priceList: [
            { id: 1, ticketName: 'DAY 1', price: '1.800.000' },
            { id: 2, ticketName: 'DAY 2', price: '1.700.000' },
            { id: 3, ticketName: 'DAY 3', price: '1.600.000' }
        ],
        organizerLogo: require('../../../public/ticket/logo/logo-penyelenggara-01.png'),
        organizer: 'Maktour',
        location: 'Wisma Maktour Bidara Cina, Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta',
        description: 'Lorem ipsum dolor sit amet consectetur. Turpis ac platea pulvinar amet. Nibh adipiscing est sed feugiat ut aliquam pharetra. At sapien molestie proin malesuada. Tortor proin sagittis mauris diam viverra vel id. Pretium non sed vestibulum at tellus posuere malesuada facilisi. Fermentum volutpat sed vestibulum vestibulum in. Cursus in tempus molestie malesuada molestie mi sagittis. Auctor cursus sed fringilla volutpat amet. Morbi eu ultrices pulvinar aliquam elit dolor in mauris vitae. Lacinia vel tortor aliquam a in hac gravida. Libero odio elementum lacus amet non at arcu placerat. Lobortis orci vestibulum sed convallis ultrices nec volutpat. Nunc sodales interdum sed consectetur nunc. Senectus sagittis proin est ac bibendum mi. Velit mauris morbi id dictum commodo in mi tortor magna. Fames malesuada ornare sit et condimentum sit. Cum sit scelerisque aliquam vitae eu turpis pulvinar maecenas. Fermentum volutpat in et aliquet. Et nisl lacus maecenas sem purus nunc aliquam. Cras lectus lectus eleifend ac. Odio nunc volutpat euismod pellentesque tristique hac velit sed. Nisl egestas velit vitae aliquam porttitor vel sagittis placerat orci. Lectus viverra viverra nisl elementum facilisis. Pellentesque egestas sit urna morbi feugiat. In vestibulum lorem integer sollicitudin. Accumsan magna placerat fermentum porta risus consectetur pretium. Eros viverra nulla.'
    },
    {
        id: 2,
        thumbnail: require('../../../public/ticket/thumbnail/tiket-02.jpg'),
        pictureDetail: require('../../../public/ticket/thumbnail/tiket-02.jpg'),
        schedule: [
            { id: 1, date: '20 Februari 2025', time: '09:00 - 16:00' },
            { id: 2, date: '21 Februari 2025', time: '09:00 - 16:00' },
        ],
        saleEndsDate: '15 Februari 2025',
        day: 2,
        title: 'Muslim Life Fest',
        priceList: [
            { id: 1, ticketName: 'DAY 1', price: '1.800.000' },
            { id: 2, ticketName: 'DAY 2', price: '1.700.000' },
        ],
        organizerLogo: require('../../../public/ticket/logo/logo-penyelenggara-01.png'),
        organizer: 'Maktour',
        location: 'Wisma Maktour Bidara Cina, Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta',
        description: 'Lorem ipsum dolor sit amet consectetur. Turpis ac platea pulvinar amet. Nibh adipiscing est sed feugiat ut aliquam pharetra. At sapien molestie proin malesuada. Tortor proin sagittis mauris diam viverra vel id. Pretium non sed vestibulum at tellus posuere malesuada facilisi. Fermentum volutpat sed vestibulum vestibulum in. Cursus in tempus molestie malesuada molestie mi sagittis. Auctor cursus sed fringilla volutpat amet. Morbi eu ultrices pulvinar aliquam elit dolor in mauris vitae. Lacinia vel tortor aliquam a in hac gravida. Libero odio elementum lacus amet non at arcu placerat. Lobortis orci vestibulum sed convallis ultrices nec volutpat. Nunc sodales interdum sed consectetur nunc. Senectus sagittis proin est ac bibendum mi. Velit mauris morbi id dictum commodo in mi tortor magna. Fames malesuada ornare sit et condimentum sit. Cum sit scelerisque aliquam vitae eu turpis pulvinar maecenas. Fermentum volutpat in et aliquet. Et nisl lacus maecenas sem purus nunc aliquam. Cras lectus lectus eleifend ac. Odio nunc volutpat euismod pellentesque tristique hac velit sed. Nisl egestas velit vitae aliquam porttitor vel sagittis placerat orci. Lectus viverra viverra nisl elementum facilisis. Pellentesque egestas sit urna morbi feugiat. In vestibulum lorem integer sollicitudin. Accumsan magna placerat fermentum porta risus consectetur pretium. Eros viverra nulla.'
    },
    {
        id: 3,
        thumbnail: require('../../../public/ticket/thumbnail/tiket-03.jpg'),
        pictureDetail: require('../../../public/ticket/thumbnail/tiket-03.jpg'),
        schedule: [
            { id: 1, date: '18 Januari 2025', time: '10:30 - 18:00' },
            { id: 2, date: '19 Januari 2025', time: '10:30 - 18:00' },
            { id: 3, date: '20 Januari 2025', time: '10:30 - 18:00' },
        ],
        saleEndsDate: '15 Januari 2025',
        day: 3,
        title: 'Pesta Keluarga Muslim',
        priceList: [
            { id: 1, ticketName: 'DAY 1', price: '1.800.000' },
            { id: 2, ticketName: 'DAY 2', price: '1.700.000' },
            { id: 3, ticketName: 'DAY 3', price: '1.600.000' }
        ],
        organizerLogo: require('../../../public/ticket/logo/logo-penyelenggara-01.png'),
        organizer: 'Maktour',
        location: 'Wisma Maktour Bidara Cina, Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta',
        description: 'Lorem ipsum dolor sit amet consectetur. Turpis ac platea pulvinar amet. Nibh adipiscing est sed feugiat ut aliquam pharetra. At sapien molestie proin malesuada. Tortor proin sagittis mauris diam viverra vel id. Pretium non sed vestibulum at tellus posuere malesuada facilisi. Fermentum volutpat sed vestibulum vestibulum in. Cursus in tempus molestie malesuada molestie mi sagittis. Auctor cursus sed fringilla volutpat amet. Morbi eu ultrices pulvinar aliquam elit dolor in mauris vitae. Lacinia vel tortor aliquam a in hac gravida. Libero odio elementum lacus amet non at arcu placerat. Lobortis orci vestibulum sed convallis ultrices nec volutpat. Nunc sodales interdum sed consectetur nunc. Senectus sagittis proin est ac bibendum mi. Velit mauris morbi id dictum commodo in mi tortor magna. Fames malesuada ornare sit et condimentum sit. Cum sit scelerisque aliquam vitae eu turpis pulvinar maecenas. Fermentum volutpat in et aliquet. Et nisl lacus maecenas sem purus nunc aliquam. Cras lectus lectus eleifend ac. Odio nunc volutpat euismod pellentesque tristique hac velit sed. Nisl egestas velit vitae aliquam porttitor vel sagittis placerat orci. Lectus viverra viverra nisl elementum facilisis. Pellentesque egestas sit urna morbi feugiat. In vestibulum lorem integer sollicitudin. Accumsan magna placerat fermentum porta risus consectetur pretium. Eros viverra nulla.'
    },
    {
        id: 4,
        thumbnail: require('../../../public/ticket/thumbnail/tiket-01.jpg'),
        pictureDetail: require('../../../public/ticket/thumbnail/tiket-01.jpg'),
        schedule: [
            { id: 1, date: '18 Maret 2025', time: '08:00 - 17:00' },
        ],
        day: 1,
        title: 'Cinta Kepada Allah',
        priceList: [
            { id: 1, ticketName: 'DAY 1', price: '1.800.000' },
        ],
        saleEndsDate: '15 Maret 2025',
        organizerLogo: require('../../../public/ticket/logo/logo-penyelenggara-01.png'),
        organizer: 'Maktour',
        location: 'Wisma Maktour Bidara Cina, Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta',
        description: 'Lorem ipsum dolor sit amet consectetur. Turpis ac platea pulvinar amet. Nibh adipiscing est sed feugiat ut aliquam pharetra. At sapien molestie proin malesuada. Tortor proin sagittis mauris diam viverra vel id. Pretium non sed vestibulum at tellus posuere malesuada facilisi. Fermentum volutpat sed vestibulum vestibulum in. Cursus in tempus molestie malesuada molestie mi sagittis. Auctor cursus sed fringilla volutpat amet. Morbi eu ultrices pulvinar aliquam elit dolor in mauris vitae. Lacinia vel tortor aliquam a in hac gravida. Libero odio elementum lacus amet non at arcu placerat. Lobortis orci vestibulum sed convallis ultrices nec volutpat. Nunc sodales interdum sed consectetur nunc. Senectus sagittis proin est ac bibendum mi. Velit mauris morbi id dictum commodo in mi tortor magna. Fames malesuada ornare sit et condimentum sit. Cum sit scelerisque aliquam vitae eu turpis pulvinar maecenas. Fermentum volutpat in et aliquet. Et nisl lacus maecenas sem purus nunc aliquam. Cras lectus lectus eleifend ac. Odio nunc volutpat euismod pellentesque tristique hac velit sed. Nisl egestas velit vitae aliquam porttitor vel sagittis placerat orci. Lectus viverra viverra nisl elementum facilisis. Pellentesque egestas sit urna morbi feugiat. In vestibulum lorem integer sollicitudin. Accumsan magna placerat fermentum porta risus consectetur pretium. Eros viverra nulla.'
    },
]

const apiTicketTop = []

export default apiTicketTop;