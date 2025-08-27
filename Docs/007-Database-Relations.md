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

# Bi-Directional One-To-One Relationship

In a bi-directional relationship, both entities are aware of the relationship. The foreign key can reside in either table, but it will be placed on the side where the `@JoinColumn` decorator is used.

# Creating a Bi-Directional Relationship

In a _uni-directional one-to-one relationship_, we can only navigate from one entity to the other (for example, we can find `metaOptions` through the `post` table, but we cannot find a `post` using the `metaOptions` table).

When we enable a bi-directional relationship, we can navigate in both directions — meaning we can find either entity through the other.

# Cascade Delete with Bi-Directional Relationship

Currently, the foreign key is in the **Post** table.

However, to enable cascade delete from the Post entity, the foreign key should be in the **MetaOptions** table. This is because what we need is: when deleting a Post, its related MetaOption should also be deleted — not the other way around (deleting a MetaOption should not delete the Post).

My Explanation - The reason is that normally, we cannot delete a record if its ID is still referenced elsewhere. By placing the foreign key in the MetaOptions table, when we delete a Post, the database sees that it has a related MetaOption and deletes MetaOption record first, before deleting the Post itself.

---

### Therotical Explanation

- One of the tables must hold the foreign key.

- That table is considered the owner of the relationship. ( So, In relationship, Owner is dependat on the other table)

_Being the owner in TypeORM just means “this side has the foreign key._

My Note - The entity that has FK is also considered as the child

#### Who is Parent vs Dependent?

- Parent (Principal) → Post

  - It does not depend on MetaOption.

  - A Post can exist without a MetaOption (if you design it that way).

- Dependent (Child) → MetaOption

  - It depends on Post, because it has a foreign key (postId).

  - It cannot exist without referencing a Post.

**Cascade delete** = `when the` **`parent row`** `is deleted, the dependent row(s) with the FK are automatically deleted by the database (ON DELETE CASCADE).`

#### Cascade Delete Behavior

If you delete a Post (parent) → the database will also delete the related MetaOption (child) because of ON DELETE CASCADE.

If you delete a MetaOption (child) → nothing happens to the Post, since the parent does not depend on the child.
