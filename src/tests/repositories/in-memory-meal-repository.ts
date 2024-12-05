import type { Meal } from '@/domain/meal/entities/meal'
import type { MealRepository } from '@/domain/meal/repositories/meal-repository'

export class InMemoryMealRepository implements MealRepository {
	private meals: Meal[] = []

	async findAll(accountId: string): Promise<Meal[]> {
		return this.meals.filter((meal) => meal.accountId === accountId)
	}

	async findById(id: string): Promise<Meal | null> {
		return this.meals.find((meal) => meal.id.toString() === id) ?? null
	}

	async create(meal: Meal): Promise<void> {
		this.meals.push(meal)
	}

	async update(meal: Meal): Promise<Meal> {
		const index = this.meals.findIndex((m) => m.id.equals(meal.id))
		if (index === -1) {
			throw new Error('Meal not found')
		}

		this.meals[index] = meal

		return meal
	}
}