export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      title: true,
      name: 'Demography',
      wrapper: {            
        element: '',        
        attributes: {}        
      },
      class: ''
    },
    {
      name: 'Data',
      url: '/demography/data',
      icon: 'icon-book-open',
    },
    {
      name: 'Maps',
      url: '/demography/maps',
      icon: 'icon-map',
    }
  ],
};
