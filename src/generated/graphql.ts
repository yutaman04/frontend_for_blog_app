export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Upload: { input: any; output: any; }
};

export type AdminArticleSummary = {
  __typename?: 'AdminArticleSummary';
  activeArticleCount: Scalars['Int']['output'];
  disabledArticleCount: Scalars['Int']['output'];
  recentPostsArticle: Array<Article>;
  totalArticleCount: Scalars['Int']['output'];
};

export type AdminArticleUpload = {
  __typename?: 'AdminArticleUpload';
  filePath: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type Article = {
  __typename?: 'Article';
  articleImages?: Maybe<Array<ArticleImage>>;
  articleType: ArticleTypeEnum;
  categoryId: Scalars['Int']['output'];
  categoryName: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createUserDisplayName: Scalars['String']['output'];
  createUserId: Scalars['Int']['output'];
  createUserName: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  totalCount: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export type ArticleImage = {
  __typename?: 'ArticleImage';
  articleId: Scalars['Int']['output'];
  createUserDisplayName: Scalars['String']['output'];
  createUserId: Scalars['Int']['output'];
  createUserName: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageName: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  sortOrder: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export enum ArticleTypeEnum {
  Fixed = 'FIXED',
  Normal = 'NORMAL'
}

export type AuthResult = {
  __typename?: 'AuthResult';
  jwt: Scalars['String']['output'];
  msg: Scalars['String']['output'];
};

export type AuthVerificationResult = {
  __typename?: 'AuthVerificationResult';
  msg: Scalars['String']['output'];
};

export type Category = {
  __typename?: 'Category';
  categoryName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type CreateAritcle = {
  __typename?: 'CreateAritcle';
  articleId: Scalars['ID']['output'];
  status: Scalars['String']['output'];
};

export type DeleteArticle = {
  __typename?: 'DeleteArticle';
  articleId: Scalars['ID']['output'];
  status: Scalars['String']['output'];
};

export type EditArticle = {
  __typename?: 'EditArticle';
  articleId: Scalars['ID']['output'];
  status: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  articleImageUpload: AdminArticleUpload;
  createArticle: CreateAritcle;
  deleteArticle: DeleteArticle;
  editArticle: EditArticle;
  jwtVerification: AuthVerificationResult;
  login: AuthResult;
  updateArticleIsActive: UpdateArticleIsActive;
};


export type MutationArticleImageUploadArgs = {
  file: Scalars['Upload']['input'];
  jwt: Scalars['String']['input'];
};


export type MutationCreateArticleArgs = {
  articleBody: Scalars['String']['input'];
  articleImages: Array<Scalars['String']['input']>;
  articleTitle: Scalars['String']['input'];
  categoryId: Scalars['Int']['input'];
  jwt: Scalars['String']['input'];
};


export type MutationDeleteArticleArgs = {
  articleId: Scalars['Int']['input'];
  jwt: Scalars['String']['input'];
};


export type MutationEditArticleArgs = {
  articleBody: Scalars['String']['input'];
  articleId: Scalars['Int']['input'];
  articleImages: Array<Scalars['String']['input']>;
  articleTitle: Scalars['String']['input'];
  categoryId: Scalars['Int']['input'];
  jwt: Scalars['String']['input'];
};


export type MutationJwtVerificationArgs = {
  targetJwt: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  userName: Scalars['String']['input'];
};


export type MutationUpdateArticleIsActiveArgs = {
  articleId: Scalars['Int']['input'];
  isActive: Scalars['Boolean']['input'];
  jwt: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  adminSummary: AdminArticleSummary;
  article: Article;
  articles: Array<Article>;
  categories: Array<Category>;
};


export type QueryAdminSummaryArgs = {
  jwt: Scalars['String']['input'];
};


export type QueryArticleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryArticlesArgs = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};

export type UpdateArticleIsActive = {
  __typename?: 'UpdateArticleIsActive';
  articleId: Scalars['ID']['output'];
  status: Scalars['String']['output'];
};
