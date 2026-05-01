// https://www.sanity.io/docs/structure-builder-cheat-sheet

export const structure = (S) =>
  S.list()
    .title('Admin Centre Médical')
    .items([
      // إضافة الخدمات الطبية
      S.documentTypeListItem('Services').title('Services'),
      
      // إضافة طلبات الحجز
      S.documentTypeListItem('reservation').title('Reservations'),
      // ## 
    ]);