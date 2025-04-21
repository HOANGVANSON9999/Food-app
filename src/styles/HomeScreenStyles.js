import { StyleSheet } from 'react-native';
import { COLOURS } from "../../components/database/Data";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: COLOURS.white,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16
  },
  headerIcon: {
    fontSize: 18,
    color: COLOURS.backgroundMedium,
    padding: 12,
    borderRadius: 10,
    backgroundColor: COLOURS.backgroundLight,
  },

  cartIcon: {
    fontSize: 18,
    color: COLOURS.backgroundMedium,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOURS.backgroundLight,
  },

  searchFilterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 15,
  },

  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
  },

  searchIcon: {
    marginRight: 6,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },

  filterIconBox: {
    backgroundColor: '#f33',
    borderRadius: 25,
    padding: 10,
  },

  categoryScroll: {
    paddingHorizontal: 16,
    marginTop: 12,
  },

  categoryButton: {
    backgroundColor: '#eee',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },

  categoryButtonActive: {
    backgroundColor: '#f33',
  },

  categoryText: {
    color: '#555',
    fontSize: 14,
  },

  categoryTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  
  




  welcomeSection: {
    marginBottom: 10,
    padding: 16
  },
  welcomeTitle: {
    fontSize: 26,
    color: COLOURS.black,
    fontWeight: '500',
    letterSpacing: 1,
    marginBottom: 10,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: COLOURS.black,
    fontWeight: '400',
    letterSpacing: 1,
    lineHeight: 20
  },
  sectionContainer: {
    padding: 16
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    color: COLOURS.black,
    fontWeight: '500',
    letterSpacing: 1,
  },
  sectionCount: {
    fontSize: 14,
    color: COLOURS.black,
    fontWeight: '400',
    opacity: 0.5,
    marginLeft: 10
  },
  seeAllText: {
    fontSize: 14,
    color: COLOURS.blue,
    fontWeight: '400'
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: "48%",
    marginVertical: 14
  },
  productImageContainer: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    backgroundColor: COLOURS.backgroundLight,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  discountBadge: {
    position: 'absolute',
    width: '20%',
    height: '24%',
    backgroundColor: COLOURS.green,
    top: 0,
    left: 0,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1
  },
  discountText: {
    fontSize: 12,
    color: COLOURS.white,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  productImage: {
    width: '80%',
    height: '80%',
  },
  productName: {
    fontSize: 12,
    color: COLOURS.black,
    fontWeight: '600',
    marginBottom: 2,
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  availabilityIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  availabilityText: {
    fontSize: 12,
  },
  productPrice: {
    fontSize: 14,
    color: COLOURS.black,
    marginTop: 4
  }
});
