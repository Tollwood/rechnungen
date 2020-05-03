import javax.persistence.Embeddable

@Embeddable
data class CategoryServiceOrder(val index: Int, val href: String)