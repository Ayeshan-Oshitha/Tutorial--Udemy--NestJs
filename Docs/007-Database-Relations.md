# Relationships in SQL Database

<img src="./images/images-06/image-1.png" width="800">

### Types of Relationships

1. One-to-One relationship
2. One-to-Many relationship / Many-to-One relationship
3. Many-to-Many relationship

<img src="./images/images-06/image-2.png" width="800">

---

<img src="./images/images-06/image-3.png" width="800">

---

<img src="./images/images-06/image-4.png" width="800">

# Auto-Loading Entities

In TypeORM, you can set `autoLoadEntities: true` to avoid listing all entities in app.module.ts, but each entity still needs to be imported in its own module.

# One-to-One Relationship

One to One relationships have two types.

1. Uni-directional One to One relationship
2. Bi-directional One to One relationship

# Uni-Directional One To One Relationship

<img src="./images/images-06/image-5.png" width="600">

A post can have only one metaOption.

In a **uni-directional one-to-one relationship**, only one entity is aware of the relationship. Here, the Post entity knows about the relationship, while the **MetaOptions** entity does not.

If both entities are aware of the relationship, it becomes a **bi-directional one-to-one relationship**.

To add a uni-directional relationship, we use two decorators:

- `@OneToOne` → defines the relationship with the other table.
- `@JoinColumn `→ creates the column to maintain the relationship.

# Cascade Creation with Relationship

With cascade enabled, we can automatically apply related operations (such as insert, update, or delete) to the associated entities

- `Insert`: automatically insert the related entity if it doesn’t exist.
- `Update`: update the related entity if it already exists (i.e., it has an id).
- `Remove`: remove the related entity if you explicitly remove it.

# Querying with Eager Loading

If we want to get related data, the first option is to use the relations option. TypeORM will fetch the related data as well. ( This is known as explicit loading.)

```javascript
let posts = await this.postsRepository.find({
  relations: { metaOptions: true },
});
```

Alternatively, we can configure the relation itself with eager: true, so TypeORM automatically loads the related entity whenever we fetch the main entity: ( This is known as eager loading)

```typescript
 @OneToOne(() => MetaOption, { cascade: true, eager: true })
  @JoinColumn()
  metaOptions?: MetaOption;
```

# Deleting Related Entities

In Uni-Directional One-to-One relationship, Cascade delete is not possible, So we have to perform sequential delete. ( One row of one table and then go to other table)
